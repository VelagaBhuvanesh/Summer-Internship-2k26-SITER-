# etl/extract.py
import pandas as pd
import glob
import os

def extract_data(raw_data_dir='data/raw', pattern='2025-*.parquet'):
    """
    Reads all monthly Parquet files (e.g., 2025-01.parquet, ...) and returns a single DataFrame.
    """
    file_pattern = os.path.join(raw_data_dir, pattern)
    files = sorted(glob.glob(file_pattern))

    if not files:
        raise FileNotFoundError(f"No files found matching {file_pattern}")

    print(f"Found {len(files)} files. Reading...")
    df_list = []
    for f in files:
        print(f"  Reading {os.path.basename(f)}")
        df_list.append(pd.read_parquet(f))

    df = pd.concat(df_list, ignore_index=True)
    print(f"Total rows extracted: {len(df)}")
    return df

