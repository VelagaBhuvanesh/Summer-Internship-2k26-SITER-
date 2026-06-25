# load_fact_3months_safe.py
import glob, os, pandas as pd, numpy as np
from etl.validate import validate
from etl.transform import build_dim_date, transform_chunk
from etl.load import get_engine          # uses SQLAlchemy engine from your load.py
from sqlalchemy import text

# ---------- CONFIG ----------
CHUNK_SIZE = 10000          # rows per insert batch
MONTHS_TO_LOAD = [10,11,12]    # Apr, May, Jun
# -----------------------------

def insert_fact_in_chunks(engine, df, table='facttrips', chunksize=CHUNK_SIZE):
    """Insert DataFrame in chunks using raw DBAPI connection."""
    df = df.where(pd.notnull(df), None)
    cols = [
        'VendorID','tpep_pickup_datetime','tpep_dropoff_datetime','trip_distance',
        'fare_amount','total_amount','trip_duration_min','fare_category',
        'date_id','driver_id','passenger_id','vehicle_id',
        'pickup_location_id','dropoff_location_id','payment_type_id','passenger_count'
    ]
    sql = f"""
        INSERT INTO facttrips ({', '.join(cols)})
        VALUES ({', '.join(['%s']*len(cols))})
    """
    
    with engine.raw_connection() as conn:
        cursor = conn.cursor()
        try:
            for i in range(0, len(df), chunksize):
                chunk = df.iloc[i:i+chunksize]
                data = [tuple(row) for row in chunk[cols].to_numpy()]
                cursor.executemany(sql, data)
                conn.commit()
                print(f"  Inserted batch {i//chunksize + 1} ({len(chunk)} rows)")
        finally:
            cursor.close()

def main():
    print("=== Loading FactTrips (Chunked Inserts) ===")
    engine = get_engine()

    # Drop & recreate facttrips (fresh start)
    with engine.connect() as conn:
        conn.execute(text("DROP TABLE IF EXISTS facttrips"))
        conn.commit()
        conn.execute(text("""
            CREATE TABLE facttrips (
                trip_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                VendorID INT,
                tpep_pickup_datetime DATETIME,
                tpep_dropoff_datetime DATETIME,
                trip_distance FLOAT,
                fare_amount FLOAT,
                total_amount FLOAT,
                trip_duration_min FLOAT,
                fare_category VARCHAR(10),
                date_id INT,
                driver_id INT,
                passenger_id INT,
                vehicle_id INT,
                pickup_location_id INT,
                dropoff_location_id INT,
                payment_type_id INT,
                passenger_count INT
            )
        """))
        conn.commit()
    print("facttrips table recreated.")

    # Read dimensions (SQLAlchemy engine – no warning)
    dim_driver = pd.read_sql("SELECT * FROM dimdriver", engine)
    dim_passenger = pd.read_sql("SELECT * FROM dimpassenger", engine)
    dim_vehicle = pd.read_sql("SELECT * FROM dimvehicle", engine)

    # File list – select only the months you want
    all_files = sorted(glob.glob('data/raw/2025-*.parquet'))
    files = [f for f in all_files if any(f.endswith(f'2025-{m:02d}.parquet') for m in MONTHS_TO_LOAD)]
    if not files:
        raise FileNotFoundError(f"No files found for months {MONTHS_TO_LOAD}")

    for f in files:
        month_name = os.path.basename(f)
        print(f"\n>>> {month_name}")

        df = pd.read_parquet(f)
        print(f"  Raw rows: {len(df)}")
        clean_df, _ = validate(df)
        print(f"  Validated rows: {len(clean_df)}")

        dim_date_month = build_dim_date(clean_df)
        fact_chunk = transform_chunk(clean_df, dim_date_month,
                                     dim_driver, dim_passenger, dim_vehicle)

        # --- Update dimdate (append new dates) ---
        existing_dates = pd.read_sql("SELECT date_id FROM dimdate", engine)
        new_dates = dim_date_month[~dim_date_month['date_id'].isin(existing_dates['date_id'])]
        if not new_dates.empty:
            new_dates.to_sql('dimdate', con=engine, if_exists='append', index=False)
            print(f"  Added {len(new_dates)} new dates to dimdate")

        # --- Insert fact chunk in small batches ---
        insert_fact_in_chunks(engine, fact_chunk)
        print(f"  Total rows inserted for {month_name}: {len(fact_chunk)}")

    print("\n=== FactTrips loading complete ===")
    print(f"Run: SELECT COUNT(*) FROM cablytics_staging.facttrips;")

if __name__ == '__main__':
    main()