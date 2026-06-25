# upload_all_facts.py
import mysql.connector
import pandas as pd
from google.cloud import bigquery
import sys
import time

# ------------------ CONFIG ------------------
MYSQL_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'chinna12',          # your MySQL password
    'database': 'cablytics_staging',
}

GCP_PROJECT = 'cablytics'      # ← replace with your real GCP project ID
BQ_DATASET  = 'cabwarehouse'  # must already exist
KEY_PATH    = 'keys/service-account.json'

BATCH_SIZE = 50_000                  # rows per upload chunk
# --------------------------------------------

def print_flush(msg):
    print(msg)
    sys.stdout.flush()

def main():
    print_flush("=== Streaming ALL facttrips rows to BigQuery ===")

    # 1. Count total rows (quick test)
    conn = mysql.connector.connect(**MYSQL_CONFIG)
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM facttrips")
    total = cur.fetchone()[0]
    cur.close()
    print_flush(f"Total rows in facttrips: {total}")

    if total == 0:
        print_flush("❌ No rows in facttrips. Exiting.")
        conn.close()
        return

    # 2. BigQuery client
    bq = bigquery.Client.from_service_account_json(KEY_PATH)
    table_ref = f"{GCP_PROJECT}.{BQ_DATASET}.facttrips"

    # 3. Server‑side cursor (streaming, not buffered)
    cursor = conn.cursor(dictionary=True, buffered=False)
    cursor.execute("SELECT * FROM facttrips")   # no WHERE clause

    first_batch = True
    uploaded = 0
    batch_num = 0

    while True:
        rows = cursor.fetchmany(BATCH_SIZE)
        if not rows:
            break

        batch_num += 1
        df = pd.DataFrame(rows)

        # Convert date/time columns
        df['tpep_pickup_datetime'] = pd.to_datetime(df['tpep_pickup_datetime'])
        df['tpep_dropoff_datetime'] = pd.to_datetime(df['tpep_dropoff_datetime'])

        # First chunk overwrites, later chunks append
        mode = (
            bigquery.WriteDisposition.WRITE_TRUNCATE
            if first_batch
            else bigquery.WriteDisposition.WRITE_APPEND
        )
        job_config = bigquery.LoadJobConfig(autodetect=True, write_disposition=mode)

        start = time.time()
        job = bq.load_table_from_dataframe(df, table_ref, job_config=job_config)
        job.result()   # wait for completion
        elapsed = time.time() - start

        uploaded += len(df)
        print_flush(f"✅ Batch {batch_num}: {len(df)} rows in {elapsed:.1f}s  (total: {uploaded}/{total})")
        first_batch = False

    cursor.close()
    conn.close()

    print_flush(f"\n🎉 All rows migrated! Total: {uploaded}")
    print_flush(f"Check in BigQuery: SELECT COUNT(*) FROM `{GCP_PROJECT}.{BQ_DATASET}.facttrips`")

if __name__ == '__main__':
    main()