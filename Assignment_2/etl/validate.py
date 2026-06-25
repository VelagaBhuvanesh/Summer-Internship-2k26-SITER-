# etl/validate.py
import pandas as pd

def validate(df, zone_lookup_path='data/raw/taxi_zone_lookup.csv'):
    """
    Performs data validation on the raw DataFrame.
    Returns: cleaned_df, validation_report (dict)
    """
    report = {'initial_rows': len(df)}
    print("Starting validation...")

    # 1. Drop exact duplicates (composite key)
    key_cols = ['tpep_pickup_datetime', 'tpep_dropoff_datetime',
                'PULocationID', 'DOLocationID', 'fare_amount', 'trip_distance']
    initial_len = len(df)
    df = df.drop_duplicates(subset=key_cols)
    report['duplicates_dropped'] = initial_len - len(df)

    # 2. Drop rows where critical fields are null
    critical_cols = ['tpep_pickup_datetime', 'tpep_dropoff_datetime',
                     'PULocationID', 'DOLocationID']
    null_mask = df[critical_cols].isnull().any(axis=1)
    report['null_critical_dropped'] = null_mask.sum()
    df = df[~null_mask]

    # 3. Dropoff must be after pickup
    time_valid = df['tpep_dropoff_datetime'] > df['tpep_pickup_datetime']
    report['invalid_time_dropped'] = (~time_valid).sum()
    df = df[time_valid]

    # 4. Trip distance and fare amount must be positive
    distance_valid = df['trip_distance'] > 0
    report['zero_distance_dropped'] = (~distance_valid).sum()
    df = df[distance_valid]

    fare_valid = df['fare_amount'] >= 0
    report['negative_fare_dropped'] = (~fare_valid).sum()
    df = df[fare_valid]

    # 5. Validate location IDs exist in zone lookup
    zones = pd.read_csv(zone_lookup_path)
    valid_ids = set(zones['LocationID'].unique())
    invalid_pu = ~df['PULocationID'].isin(valid_ids)
    invalid_do = ~df['DOLocationID'].isin(valid_ids)
    report['invalid_pu_location'] = invalid_pu.sum()
    report['invalid_do_location'] = invalid_do.sum()
    df = df[~(invalid_pu | invalid_do)]

    # 6. Remove obvious outliers (optional)
    outlier_mask = (df['trip_distance'] > 100) | (df['fare_amount'] > 500)
    report['outliers_dropped'] = outlier_mask.sum()
    df = df[~outlier_mask]

    report['final_rows'] = len(df)

    print("Validation report:")
    for k, v in report.items():
        print(f"  {k}: {v}")

    return df, report

