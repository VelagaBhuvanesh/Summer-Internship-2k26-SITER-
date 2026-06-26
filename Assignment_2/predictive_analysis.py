# predictive_analysis.py
import pandas as pd
from prophet import Prophet
import mysql.connector
from sqlalchemy import create_engine, text
from sqlalchemy.types import Date, Float

# ---------- CONFIG ----------
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASS = 'chinna12'
MYSQL_DB   = 'cablytics_staging'
ENGINE = create_engine(f'mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}:3306/{MYSQL_DB}')
CHUNK_SIZE = 100_000

def extract_daily_trips_chunked():
    conn = mysql.connector.connect(host=MYSQL_HOST, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_DB)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT tpep_pickup_datetime FROM facttrips")
    daily_counts = {}
    while True:
        rows = cursor.fetchmany(CHUNK_SIZE)
        if not rows:
            break
        for row in rows:
            day = row['tpep_pickup_datetime'].date()
            daily_counts[day] = daily_counts.get(day, 0) + 1
    cursor.close()
    conn.close()
    df = pd.DataFrame(list(daily_counts.items()), columns=['ds', 'y'])
    df['ds'] = pd.to_datetime(df['ds'])
    df = df.sort_values('ds')
    return df

def train_and_forecast(df, periods=30):
    # Force non-negative forecasts with logistic growth
    df['floor'] = 0
    df['cap'] = df['y'].max() * 1.5
    model = Prophet(growth='logistic', daily_seasonality=True, yearly_seasonality=True)
    model.fit(df)
    future = model.make_future_dataframe(periods=periods)
    future['floor'] = 0
    future['cap'] = df['cap'].max()
    forecast = model.predict(future)
    result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
    return model, result

def save_forecast_to_mysql(forecast_df):
    forecast_df['ds'] = pd.to_datetime(forecast_df['ds']).dt.date
    dtype_dict = {'ds': Date(), 'yhat': Float(), 'yhat_lower': Float(), 'yhat_upper': Float()}
    forecast_df.to_sql('trip_forecast', con=ENGINE, if_exists='replace', index=False, dtype=dtype_dict)
    with ENGINE.connect() as conn:
        conn.execute(text("ALTER TABLE trip_forecast ADD PRIMARY KEY (ds)"))
        conn.commit()
    print("Forecast saved to MySQL.")

def main():
    print("=== Cablytics Demand Forecasting ===")
    daily_df = extract_daily_trips_chunked()
    _, forecast_df = train_and_forecast(daily_df, periods=30)
    save_forecast_to_mysql(forecast_df)
    print("✅ Done. Forecast ready in trip_forecast table.")

if __name__ == '__main__':
    main()