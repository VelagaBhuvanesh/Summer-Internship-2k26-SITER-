# PrismFlow
### A Retail ETL Pipeline and Business Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.x-blue)
![SQL](https://img.shields.io/badge/SQL-Database-green)
![Apache Airflow](https://img.shields.io/badge/Apache-Airflow-red)
![Power BI](https://img.shields.io/badge/Power%20BI-Business%20Intelligence-yellow)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📖 Overview

PrismFlow is a modern Data Engineering platform designed for retail businesses to automate their data processing workflow.

Retail organizations often receive business data from multiple systems such as Sales, Customers, Inventory, Products, and Suppliers. These datasets are typically stored in different formats, making analysis difficult.

PrismFlow centralizes these datasets by providing an automated ETL (Extract, Transform, Load) pipeline that validates, cleans, transforms, and loads the processed data into a centralized Data Warehouse. The processed data is then visualized through Microsoft Power BI dashboards for business intelligence.

---

## 🎯 Problem Statement

Retail businesses generate massive amounts of operational data every day.

Some common challenges include:

- Multiple disconnected data sources
- Duplicate and inconsistent records
- Missing values
- Different file formats
- Difficult manual reporting
- Lack of centralized analytics

PrismFlow solves these problems through an automated retail ETL pipeline.

---

# 🚀 Features

- Multi-source Retail Dataset Upload
- Schema Validation
- Automated ETL Pipeline
- Data Cleaning
- Data Transformation
- Data Quality Validation
- Staging Database
- Centralized Data Warehouse
- Power BI Integration
- Modern Responsive Web Interface

---

# 🏗 System Architecture

```
Retail Data Sources
       │
       ▼
 Upload Interface
       │
       ▼
Schema Validation
       │
       ▼
ETL Pipeline
(Extract • Transform • Load)
       │
       ▼
Staging Database
       │
       ▼
Data Warehouse
       │
       ▼
Microsoft Power BI
```

---

# 📂 Supported Retail Datasets

PrismFlow currently supports:

- Sales Data
- Customer Data
- Product Data
- Inventory Data
- Supplier Data

Supported File Formats:

- CSV (.csv)
- Excel (.xlsx)
- JSON (.json)

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python

## Data Engineering

- Pandas
- SQL
- Apache Airflow

## Data Storage

- MySQL (Staging Database)
- Google BigQuery (Data Warehouse)

## Business Intelligence

- Microsoft Power BI

## Version Control

- Git
- GitHub

---

# 🔄 ETL Workflow

### 1. Extract

Retail datasets are uploaded through the web interface.

Examples:

- Sales.csv
- Customers.xlsx
- Products.csv
- Inventory.xlsx
- Suppliers.csv

---

### 2. Validate

The system validates:

- File format
- Required columns
- Data types
- Missing fields

---

### 3. Transform

Data processing includes:

- Removing duplicate records
- Handling missing values
- Standardizing formats
- Date conversion
- Data normalization
- Business rule validation

---

### 4. Load

Processed data is first loaded into a staging database.

After validation, the data is transferred into the centralized Data Warehouse for analytics.

---

### 5. Business Intelligence

Microsoft Power BI connects directly to the Data Warehouse to provide:

- Sales Analytics
- Product Performance
- Inventory Insights
- Customer Analysis
- Revenue Trends

---

# 📊 Project Workflow

```
Upload Retail Dataset
        │
        ▼
Schema Validation
        │
        ▼
Extract
        │
        ▼
Transform
        │
        ▼
Load into Staging Database
        │
        ▼
Load into Data Warehouse
        │
        ▼
Power BI Dashboard
```

---

# 📁 Project Structure

```
PrismFlow/
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── upload.html
│   └── powerbi.html
│
├── etl/
│   ├── extract.py
│   ├── transform.py
│   ├── load.py
│
├── database/
│
├── airflow/
│
├── requirements.txt
│
├── README.md
│
└── app.py
```

---

# 📌 Future Enhancements

- Automatic Schema Detection
- Real-time ETL Monitoring
- Incremental Data Loading
- Data Lineage Tracking
- Data Quality Reports
- AI-powered Business Insights
- User Authentication
- Cloud Deployment
- Multi-tenant Support

---

# 🎓 Learning Objectives

This project demonstrates practical implementation of:

- Data Engineering
- ETL Pipelines
- SQL
- Data Warehousing
- Apache Airflow
- Business Intelligence
- Data Validation
- Version Control using Git

---

# 👨‍💻 Author

**Velaga Bhuvanesh**

Summer Internship 2026

Data Engineering Domain

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub!