# etl/load.py
from sqlalchemy import create_engine, text
import pandas as pd

DB_USER = 'root'
DB_PASSWORD = 'chinna12'          # <--- CHANGE THIS to your real MySQL password
DB_HOST = 'localhost'
DB_PORT = '3306'
STAGING_DB = 'cablytics_staging'

def get_engine():
    return create_engine(f'mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{STAGING_DB}')

def load_dimensions(engine, dim_tables_dict):
    """Load all dimension tables. Drops existing tables first (using raw SQL), then appends."""
    pk_map = {
        'DimDate': 'date_id',
        'DimLocation': 'location_id',
        'DimPayment': 'payment_type_id',
        'DimDriver': 'driver_id',
        'DimPassenger': 'passenger_id',
        'DimVehicle': 'vehicle_id',
    }
    for table_name, df in dim_tables_dict.items():
        print(f"Loading {table_name} ({len(df)} rows)...")
        try:
            # 1. Drop table if it exists (avoid reflection error)
            with engine.connect() as conn:
                conn.execute(text(f"DROP TABLE IF EXISTS `{table_name}`"))
                conn.commit()

            # 2. Create table by appending (table doesn't exist, so it will be created)
            df.to_sql(table_name, con=engine, if_exists='append', index=False)
            print(f"  {table_name} loaded.")

            # 3. Add primary key
            if table_name in pk_map:
                pk_col = pk_map[table_name]
                with engine.connect() as conn:
                    conn.execute(text(f"ALTER TABLE `{table_name}` ADD PRIMARY KEY (`{pk_col}`)"))
                    conn.commit()
                    print(f"  Primary key added on {pk_col}.")
        except Exception as e:
            print(f"  ❌ FAILED to load {table_name}: {e}")
            raise

def load_fact(engine, fact_df, table_name='FactTrips', if_exists='replace'):
    """Load fact table. For the first chunk we replace; for later chunks we append."""
    print(f"Loading {table_name} ({len(fact_df)} rows)...")
    try:
        if if_exists == 'replace':
            # Drop first, then create fresh
            with engine.connect() as conn:
                conn.execute(text(f"DROP TABLE IF EXISTS `{table_name}`"))
                conn.commit()
            fact_df.to_sql(table_name, con=engine, if_exists='append', index=False)
            # Add auto-increment primary key
            with engine.connect() as conn:
                conn.execute(text(
                    f"ALTER TABLE `{table_name}` ADD COLUMN trip_id BIGINT AUTO_INCREMENT PRIMARY KEY FIRST;"
                ))
                conn.commit()
        else:
            # Append mode: table already exists
            fact_df.to_sql(table_name, con=engine, if_exists='append', index=False)
        print(f"  {table_name} loaded.")
    except Exception as e:
        print(f"  ❌ FAILED to load {table_name}: {e}")
        raise