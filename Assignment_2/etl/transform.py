# etl/transform.py
import pandas as pd
import numpy as np
from faker import Faker
import random

# =====================================================
# Dimension builders
# =====================================================

def build_dim_date(df, pickup_col='tpep_pickup_datetime'):
    """Create DimDate from unique pickup dates in a chunk."""
    pickup_dates = pd.to_datetime(df[pickup_col]).dt.date
    unique_dates = pickup_dates.unique()
    dim_date = pd.DataFrame({'date': pd.to_datetime(unique_dates)})
    dim_date['date_id'] = dim_date['date'].dt.strftime('%Y%m%d').astype(int)
    dim_date['year'] = dim_date['date'].dt.year
    dim_date['month'] = dim_date['date'].dt.month
    dim_date['day'] = dim_date['date'].dt.day
    dim_date['hour'] = 0
    dim_date['weekday'] = dim_date['date'].dt.day_name()
    dim_date['quarter'] = dim_date['date'].dt.quarter
    return dim_date

def build_dim_location(zone_lookup_path='data/raw/taxi_zone_lookup.csv'):
    """Load zone lookup CSV as DimLocation."""
    dim_location = pd.read_csv(zone_lookup_path)
    dim_location = dim_location.rename(columns={
        'LocationID': 'location_id',
        'Borough': 'borough',
        'Zone': 'zone',
        'service_zone': 'service_zone'
    })
    return dim_location

def build_dim_payment():
    """Create DimPayment based on TLC payment_type codes."""
    data = {
        'payment_type_id': [1, 2, 3, 4, 5, 6],
        'payment_type_desc': [
            'Credit card',
            'Cash',
            'No charge',
            'Dispute',
            'Unknown',
            'Voided trip'
        ]
    }
    return pd.DataFrame(data)

def build_synthetic_dimension(prefix, num_records, extra_cols=None):
    """Generate a synthetic dimension table using faker."""
    fake = Faker()
    records = []
    for i in range(1, num_records + 1):
        rec = {f'{prefix}_id': i}
        if prefix == 'driver':
            rec['first_name'] = fake.first_name()
            rec['last_name'] = fake.last_name()
            rec['rating'] = round(random.uniform(3.5, 5.0), 1)
        elif prefix == 'passenger':
            rec['first_name'] = fake.first_name()
            rec['last_name'] = fake.last_name()
            rec['membership_tier'] = random.choice(['Basic', 'Silver', 'Gold', 'Platinum'])
        elif prefix == 'vehicle':
            rec['vehicle_model'] = random.choice(['Toyota Camry', 'Honda Accord', 'Tesla Model 3', 'Ford Escape'])
            rec['vehicle_year'] = random.randint(2019, 2025)
            rec['vehicle_type'] = random.choice(['Sedan', 'SUV', 'EV', 'Hybrid'])
        if extra_cols:
            rec.update(extra_cols(i))
        records.append(rec)
    return pd.DataFrame(records)

# =====================================================
# Chunk-based transform
# =====================================================

def transform_chunk(df, dim_date, dim_driver, dim_passenger, dim_vehicle):
    """
    Transforms a single chunk (e.g., one month) into a FactTrips DataFrame.
    Assumes dimensions are already built and loaded.
    """
    fact = df.copy()

    # Map date_id using pickup date
    fact['pickup_date'] = pd.to_datetime(fact['tpep_pickup_datetime']).dt.date
    dim_date['date_str'] = dim_date['date'].dt.date
    date_map = dict(zip(dim_date['date_str'], dim_date['date_id']))
    fact['date_id'] = fact['pickup_date'].map(date_map)

    # Payment type mapping
    fact['payment_type_id'] = fact['payment_type']

    # Assign synthetic foreign keys randomly (reproducible)
    rng = np.random.default_rng(42)
    fact['driver_id'] = rng.integers(1, len(dim_driver) + 1, size=len(fact))
    fact['passenger_id'] = rng.integers(1, len(dim_passenger) + 1, size=len(fact))
    fact['vehicle_id'] = rng.integers(1, len(dim_vehicle) + 1, size=len(fact))

    # Location IDs from the raw data
    fact['pickup_location_id'] = fact['PULocationID']
    fact['dropoff_location_id'] = fact['DOLocationID']

    # Derived columns
    fact['trip_duration_min'] = (
        pd.to_datetime(fact['tpep_dropoff_datetime']) -
        pd.to_datetime(fact['tpep_pickup_datetime'])
    ).dt.total_seconds() / 60

    bins = [0, 10, 30, float('inf')]
    labels = ['Low', 'Medium', 'High']
    fact['fare_category'] = pd.cut(fact['fare_amount'], bins=bins, labels=labels, right=False)

    # Final column selection
    fact_trips = fact[[
        'VendorID',
        'tpep_pickup_datetime',
        'tpep_dropoff_datetime',
        'trip_distance',
        'fare_amount',
        'total_amount',
        'trip_duration_min',
        'fare_category',
        'date_id',
        'driver_id',
        'passenger_id',
        'vehicle_id',
        'pickup_location_id',
        'dropoff_location_id',
        'payment_type_id',
        'passenger_count'
    ]].reset_index(drop=True)

    return fact_trips

# (Optional) Legacy single-shot transform – not used in incremental pipeline
def transform(df):
    dim_date = build_dim_date(df)
    dim_location = build_dim_location()
    dim_payment = build_dim_payment()
    dim_driver = build_synthetic_dimension('driver', 5000)
    dim_passenger = build_synthetic_dimension('passenger', 10000)
    dim_vehicle = build_synthetic_dimension('vehicle', 3000)
    fact_trips = transform_chunk(df, dim_date, dim_driver, dim_passenger, dim_vehicle)
    return dim_date, dim_location, dim_payment, dim_driver, dim_passenger, dim_vehicle, fact_trips