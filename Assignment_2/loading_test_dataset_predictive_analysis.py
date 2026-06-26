# load_jan2026.py
import pandas as pd
import pyarrow.parquet as pq
import mysql.connector
import sys

# ---------- CONFIG ----------
MYSQL_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'chinna12',
    'database': 'cablytics_staging'
}
PARQUET_FILE = 'data/raw/2026-01.parquet'   # change path if needed
BATCH_SIZE = 100_000

# Columns we actually want to keep – must match the table definition
DESIRED_COLUMNS = [
    'VendorID',
    'tpep_pickup_datetime',
    'tpep_dropoff_datetime',
    'passenger_count',
    'trip_distance',
    'PULocationID',
    'DOLocationID',
    'payment_type',
    'fare_amount',
    'total_amount'
]
# ---------------------------

def create_table(cursor):
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS trips_2026_01_raw (
            VendorID INT,
            tpep_pickup_datetime DATETIME,
            tpep_dropoff_datetime DATETIME,
            passenger_count INT,
            trip_distance FLOAT,
            PULocationID INT,
            DOLocationID INT,
            payment_type INT,
            fare_amount FLOAT,
            total_amount FLOAT
        )
    """)

def main():
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    cursor = conn.cursor()
    create_table(cursor)
    conn.commit()
    print("Table ready.")

    parquet_file = pq.ParquetFile(PARQUET_FILE)
    total_rows = 0

    print(f"Loading file in batches of {BATCH_SIZE} rows...")
    for batch in parquet_file.iter_batches(batch_size=BATCH_SIZE):
        df_chunk = batch.to_pandas()

        # Keep only the columns we defined in the table
        # (if a column doesn't exist in the file, we can't load it; they should all exist)
        existing_cols = [c for c in DESIRED_COLUMNS if c in df_chunk.columns]
        df_chunk = df_chunk[existing_cols]

        # Convert datetime columns
        df_chunk['tpep_pickup_datetime'] = pd.to_datetime(df_chunk['tpep_pickup_datetime'])
        df_chunk['tpep_dropoff_datetime'] = pd.to_datetime(df_chunk['tpep_dropoff_datetime'])

        # Replace NaN with None for SQL
        df_chunk = df_chunk.where(pd.notnull(df_chunk), None)

        # Build INSERT statement dynamically using the selected columns
        cols = ', '.join(df_chunk.columns)
        placeholders = ', '.join(['%s'] * len(df_chunk.columns))
        sql = f"INSERT INTO trips_2026_01_raw ({cols}) VALUES ({placeholders})"

        # Convert rows to list of tuples
        data = [tuple(row) for row in df_chunk.to_numpy()]

        cursor.executemany(sql, data)
        conn.commit()

        total_rows += len(df_chunk)
        print(f"  {total_rows} rows inserted so far...")

    cursor.close()
    conn.close()
    print(f"✅ Done. Total rows loaded: {total_rows}")

if __name__ == '__main__':
    main()