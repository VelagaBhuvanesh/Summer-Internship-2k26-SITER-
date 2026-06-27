# predictive_xgboost_fullyear.py
import pandas as pd
import numpy as np
import glob
import pyarrow.parquet as pq
from sqlalchemy import create_engine, text
from sqlalchemy.types import Date, Float
from xgboost import XGBRegressor

# ---------- CONFIG ----------
PARQUET_DIR = 'data/raw'
PARQUET_PATTERN = '2025-*.parquet'

MYSQL_ENGINE = create_engine('mysql+mysqlconnector://root:chinna12@localhost:3306/cablytics_staging')

CHUNK_SIZE = 200_000   # rows per Parquet batch for daily aggregation
# ---------------------------

def extract_daily_trips_from_parquet():
    """Reads all 2025 Yellow Taxi Parquet files, aggregates daily trip counts."""
    files = sorted(glob.glob(f'{PARQUET_DIR}/{PARQUET_PATTERN}'))
    if not files:
        raise FileNotFoundError("No 2025 Parquet files found in data/raw/")
    print(f"Found {len(files)} monthly files.")

    daily_counts = {}
    for f in files:
        print(f"  Reading {f} ...")
        pf = pq.ParquetFile(f)
        # Stream batches to avoid RAM spike
        for batch in pf.iter_batches(batch_size=CHUNK_SIZE):
            df_batch = batch.to_pandas()
            # Use pickup datetime column
            if 'tpep_pickup_datetime' in df_batch.columns:
                pickups = pd.to_datetime(df_batch['tpep_pickup_datetime'])
            elif 'lpep_pickup_datetime' in df_batch.columns:
                pickups = pd.to_datetime(df_batch['lpep_pickup_datetime'])
            else:
                raise KeyError("No pickup datetime column found.")
            # Count per date
            for dt in pickups:
                day = dt.date()
                daily_counts[day] = daily_counts.get(day, 0) + 1

    # Build DataFrame
    df = pd.DataFrame(list(daily_counts.items()), columns=['ds', 'y'])
    df['ds'] = pd.to_datetime(df['ds'])
    df = df.sort_values('ds').reset_index(drop=True)
    print(f"Aggregated {len(df)} daily trip records.")
    return df

def engineer_features(df):
    """Add calendar features and a shifted rolling average."""
    df = df.copy()
    df['dayofweek'] = df['ds'].dt.dayofweek
    df['month']      = df['ds'].dt.month
    df['dayofyear']  = df['ds'].dt.dayofyear
    # 7-day rolling average of previous days (no leakage)
    df['rolling_7'] = df['y'].shift(1).rolling(7).mean()
    # Fill initial missing with overall mean
    df['rolling_7'] = df['rolling_7'].fillna(df['y'].mean())
    return df

def main():
    print("=== XGBoost Full‑Year 2025 Hold‑out Validation ===")
    df = extract_daily_trips_from_parquet()
    df = df[(df['ds'] >= '2025-01-01') & (df['ds'] <= '2025-12-31')]  # just in case
    print(f"Filtered to 2025: {len(df)} days, from {df['ds'].min().date()} to {df['ds'].max().date()}")

    # Chronological split: train on first ~335 days, test on last 30 days
    split_idx = len(df) - 30
    train = df.iloc[:split_idx]
    test  = df.iloc[split_idx:]

    print(f"Train: {len(train)} days ({train['ds'].min().date()} to {train['ds'].max().date()})")
    print(f"Test:  {len(test)} days ({test['ds'].min().date()} to {test['ds'].max().date()})")

    # Feature engineering
    df_feat = engineer_features(df)
    train_feat = df_feat.iloc[:split_idx]
    test_feat  = df_feat.iloc[split_idx:]

    features = ['dayofweek', 'month', 'dayofyear', 'rolling_7']
    X_train, y_train = train_feat[features], train_feat['y']
    X_test,  y_test  = test_feat[features],  test_feat['y']

    # Train XGBoost
    model = XGBRegressor(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)

    # Predict on test
    preds = model.predict(X_test).round().astype(int)
    preds = np.clip(preds, 0, None)  # safety floor

    # Evaluation
    result = test[['ds']].copy()
    result['yhat']   = preds
    result['actual'] = y_test.values
    result['error']  = result['actual'] - result['yhat']
    result['abs_error'] = np.abs(result['error'])

    mae  = result['abs_error'].mean()
    rmse = np.sqrt((result['error'] ** 2).mean())
    mape = (result['abs_error'] / result['actual']).mean() * 100

    print(f"\nMAE : {mae:.0f} trips/day")
    print(f"RMSE: {rmse:.0f} trips/day")
    print(f"MAPE: {mape:.1f}%")

    # Save to MySQL
    result['ds'] = pd.to_datetime(result['ds']).dt.date
    dtype = {
        'ds': Date(), 'yhat': Float(), 'actual': Float(),
        'error': Float(), 'abs_error': Float()
    }
    result.to_sql('forecast_xgb_results', con=MYSQL_ENGINE, if_exists='replace',
                  index=False, dtype=dtype)
    with MYSQL_ENGINE.connect() as conn:
        conn.execute(text("ALTER TABLE forecast_xgb_results ADD PRIMARY KEY (ds)"))
        conn.commit()
    print("✅ Results saved to 'forecast_xgb_results' table.")

if __name__ == '__main__':
    main()