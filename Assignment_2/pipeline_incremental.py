# load_fact_only.py
import glob, os, pandas as pd
from sqlalchemy import text, exc
from etl.validate import validate
from etl.transform import build_dim_date, transform_chunk
from etl.load import get_engine

def safe_execute(engine, sql, commit=True):
    """Execute a raw SQL statement in a new connection, then close."""
    with engine.connect() as conn:
        try:
            conn.execute(text(sql))
            if commit:
                conn.commit()
        except exc.SQLAlchemyError as e:
            print(f"SQL error: {e}")
            conn.rollback()
            raise

def load_all_facts():
    print("=== Loading facttrips (lowercase) into MySQL ===")
    engine = get_engine()
    engine.dispose()  # clear any stale connections from previous runs

    # 1. Drop facttrips using a safe fresh connection
    try:
        safe_execute(engine, "DROP TABLE IF EXISTS facttrips")
        print("Existing facttrips dropped (if any).")
    except Exception as e:
        print(f"Could not drop facttrips: {e}")
        # If drop fails (unlikely), we continue anyway – the table might not exist
        pass

    # 2. Read dimensions from MySQL (they are lowercase)
    try:
        dim_driver = pd.read_sql("SELECT * FROM dimdriver", engine)
        dim_passenger = pd.read_sql("SELECT * FROM dimpassenger", engine)
        dim_vehicle = pd.read_sql("SELECT * FROM dimvehicle", engine)
    except Exception as e:
        print(f"Error reading dimension tables: {e}")
        raise

    # 3. Find monthly files
    files = sorted(glob.glob('data/raw/2025-*.parquet'))
    if not files:
        raise FileNotFoundError("No monthly parquet files found in data/raw/")

    first_month = True

    for f in files:
        month_name = os.path.basename(f)
        print(f"\n>>> Processing {month_name}")

        df = pd.read_parquet(f)
        print(f"  Raw rows: {len(df)}")

        clean_df, report = validate(df)
        print(f"  Rows after validation: {len(clean_df)}")

        dim_date_month = build_dim_date(clean_df)
        fact_chunk = transform_chunk(clean_df, dim_date_month,
                                     dim_driver, dim_passenger, dim_vehicle)

        # DimDate: append new dates (no replace, no DROP)
        try:
            existing_dates = pd.read_sql("SELECT date_id FROM dimdate", engine)
            new_dates = dim_date_month[~dim_date_month['date_id'].isin(existing_dates['date_id'])]
            if not new_dates.empty:
                new_dates.to_sql('dimdate', con=engine, if_exists='append', index=False)
        except Exception as e:
            print(f"DimDate update error (may already be up to date): {e}")
            # non-fatal; continue

        # Load fact chunk
        if first_month:
            # First file: create the table
            try:
                fact_chunk.to_sql('facttrips', con=engine, if_exists='append', index=False)
                # Add primary key with a fresh connection
                with engine.connect() as conn:
                    conn.execute(text(
                        "ALTER TABLE facttrips ADD COLUMN trip_id BIGINT AUTO_INCREMENT PRIMARY KEY FIRST"
                    ))
                    conn.commit()
                first_month = False
            except Exception as e:
                print(f"Error creating facttrips: {e}")
                engine.dispose()  # reset connection after error
                raise
        else:
            try:
                fact_chunk.to_sql('facttrips', con=engine, if_exists='append', index=False)
            except Exception as e:
                print(f"Error appending fact data: {e}")
                engine.dispose()
                raise

        print(f"  Fact rows loaded: {len(fact_chunk)}")

    print("\n=== facttrips population complete ===")
    print("Run in MySQL: SELECT COUNT(*) FROM cablytics_staging.facttrips;")

if __name__ == '__main__':
    load_all_facts()