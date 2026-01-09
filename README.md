# FINANCE SIMULATION BACKEND

This repository hosts a production-grade financial simulation backend built using Go and Clean Architecture principles.
The system simulates real-world portfolio management, transactions, expenses, market data ingestion, and financial analytics.

## The project demonstrates:-
1) Clean Hexagonal Architecture with strict domain separation
2) RESTful API design using the Chi router
3) Global middleware for logging, recovery, timeouts, and request tracing
4) Redis cache-aside strategy for market data and dashboards
5) PostgreSQL persistence using pgx and connection pooling
6) Repository pattern for isolated, testable data access
7) External stock market API integration via RapidAPI
8) Efficient Go concurrency using goroutines and contexts
9) Safe graceful shutdown using OS signals and channels
10) Production-ready backend practices focused on scalability and reliability

## Table of Contents:-
- [Architecture Diagram](#Architecture-Diagram)
- [Core Design Principles](#core-design-principles)
- [Technology Stack](#technology-stack)
- [System Components](#system-components)
- [API Design & Routes](#api-design--routes)
- [Getting Started](#getting-started)
- [Author](#author)
- [License](#license)

## Architecture Diagram:-
Below is a high-level overview of the system architecture:

<img width="2121" height="2991" alt="final" src="https://github.com/user-attachments/assets/bf1f3663-235a-4354-837d-5e92998cfde7" />

## Core Design Principles:-
1) Separation of Concerns – Each layer has a well-defined role
2) Dependency Injection – Services depend on interfaces, not implementations
3) Thin Controllers – Handlers only translate HTTP to business calls
4) Explicit Caching – Redis used intentionally, not implicitly
5) Fail-Safe Design – Panic recovery and graceful shutdown
6) Scalable by Default – Designed for horizontal scaling

## Technology Stack
1) GO (chi router)
2) PostgreSQL
3) Redis
4) RapidAPI (stock market data)
5) Bruno (endpoint testing)

## System Components:-

### Authentication & User Management
1) User registration and login
2) JWT-based authentication
3) Admin and user role separation

### Portfolio Management
1) Track user holdings
2) Calculate portfolio value using live stock prices
3) Cached stock price lookups for performance

### Transactions
1) Buy / Sell stock operations
2) Portfolio updates
3) Transaction persistence
4) Automatic net worth recalculation

### Expenses & Planning
1) Track daily expenses
2) Planned (future) expenses
3) Integrated into net worth calculations

### Net Worth Engine
1) Aggregates portfolio value
2) Subtracts expenses
3) Produces real-time net worth

### Market & Heatmap
1) Live market data via RapidAPI
2) Sector/market heatmap support
3) Redis-backed caching layer

### Dashboard
1) Portfolio summary
2) Net worth
3) Expenses
4) Cached dashboard responses for fast loading

## API Design & Routes
This are some of the features of this backend:-
### 1. Create User
POST /users
```json
Request Body (JSON)
{
  "email": "john.doe@gmail.com",
  "full_name": "John Doe",
  "avatar_url": "https://avatar.com/john.png",
  "google_id": "google-oauth-id-12345"
}

Success Response (201)
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@gmail.com",
  "full_name": "John Doe",
  "avatar_url": "https://avatar.com/john.png",
  "google_id": "google-oauth-id-12345",
  "fake_balance": 1000,
  "is_admin": false,
  "created_at": "2025-01-01T10:00:00Z",
  "updated_at": "2025-01-01T10:00:00Z"
}
```

### 2. Get Stock Price according to symbol
GET /market/price/GE
```json
Success Response (201)
{
  "meta": {
    "version": "v1.0",
    "status": 200,
    "copywrite": "https://steadyapi.com"
  },
  "body": {
    "symbol": "GE",
    "companyName": "GE Aerospace Common Stock",
    "marketStatus": "Pre-Market",
    "primaryData": {
      "lastSalePrice": "$316.45",
      "netChange": "+2.01",
      "percentageChange": "+0.64%",
      "isRealTime": true,
      "volume": "8,477"
    }
  }
}
```

### 3. Buy / Sale Transactions
POST /transactions/buy

```json
Request Body (JSON)
{
  "user_id": "77705829-b3e3-4846-8c7a-f4353fff483a",
  "symbol": "DAL",
  "quantity": "2"
}

Success Response (201)
{
  "status": "buy order executed successfully"
}
```
POST /transactions/sale

```json
Request Body (JSON)
{
  "user_id": "77705829-b3e3-4846-8c7a-f4353fff483a",
  "symbol": "DAL",
  "quantity": "1"
}

Success Response (201)
{
  "status": "sale order executed successfully"
}
```
### 4. Portfolio
POST /portfolio/{userID}

```json
[
  {
    "id": "916e2a35-0676-47ed-8af3-8b91a3ad8951",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "stock_symbol": "AAPL",
    "quantity": 3,
    "avg_price": 270.8,
    "created_at": "2026-01-05T19:42:40.641228Z",
    "updated_at": "2026-01-06T18:36:34.976848Z"
  },
  {
    "id": "aa9d9ea7-6249-42c7-b03e-7955f1030a80",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "stock_symbol": "NFLX",
    "quantity": 2,
    "avg_price": 91.76,
    "created_at": "2026-01-06T18:37:44.838716Z",
    "updated_at": "2026-01-06T18:37:44.838716Z"
  },
  {
    "id": "d1ab6d32-a704-4dff-97af-851ff5c78f90",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "stock_symbol": "BABA",
    "quantity": 20,
    "avg_price": 154.6,
    "created_at": "2026-01-06T18:38:24.630994Z",
    "updated_at": "2026-01-06T18:38:24.630994Z"
  },
  {
    "id": "715e2ba8-dd16-48b0-bf4d-686fd4c7ed52",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "stock_symbol": "GE",
    "quantity": 20,
    "avg_price": 324.43,
    "created_at": "2026-01-06T18:38:55.546611Z",
    "updated_at": "2026-01-06T18:38:55.546611Z"
  }
]
```
### 5. Expense
POST users/{userID}/expense

```json
Request Body (JSON)
{
  "amount": "100.75",
  "category": "Internet bill",
  "description": "payed through google pay",
  "date": "2026-01-06T00:00:00Z"
}

Success Response (201)
{
  "message": "expense added successfully"
}
```
GET users/{userID}/expenses

```json
[
  {
    "id": "e0080e0a-13e9-4466-ad95-a9b32f49309a",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "amount": "250.75",
    "category": "Food",
    "description": "Lunch at cafe",
    "date": "2026-01-06T00:00:00Z",
    "created_at": "2026-01-06T19:18:59.774112+05:30",
    "updated_at": "2026-01-06T19:18:59.774112+05:30"
  },
  {
    "id": "2bb3dcd1-c1fa-4a9e-86e6-174701cef372",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "amount": "1950.75",
    "category": "study material",
    "description": "for clg shi",
    "date": "2026-01-06T00:00:00Z",
    "created_at": "2026-01-06T19:20:17.711489+05:30",
    "updated_at": "2026-01-06T19:20:17.711489+05:30"
  },
  {
    "id": "f8f4a1e7-d2ad-44ab-90ad-7dbbeaaa12a5",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "amount": "10.75",
    "category": "candy",
    "description": "from shop",
    "date": "2026-01-06T00:00:00Z",
    "created_at": "2026-01-06T19:20:58.222585+05:30",
    "updated_at": "2026-01-06T19:20:58.222585+05:30"
  },
  {
    "id": "23bad74d-cef5-4ff1-8e3b-1789f68dbce6",
    "user_id": "a522415e-953a-4e96-8677-458b63fbda76",
    "amount": "100.75",
    "category": "Internet bill",
    "description": "payed through google pay",
    "date": "2026-01-06T00:00:00Z",
    "created_at": "2026-01-09T19:20:05.023969+05:30",
    "updated_at": "2026-01-09T19:20:05.023969+05:30"
  }
]
```
## Getting Started
Prerequisites
1) Go 1.21+
2) PostgreSQL
3) Redis
4) Git

Clone the Repository
```
git clone https://github.com/yourusername/finance-simulation.git
cd finance-simulation/backend
```
Run the Server
```
go mod tidy
go run cmd/main.go
```
## Author
**Hardik Borse** | [LinkedIn](https://www.linkedin.com/in/hardik-borse-aa7729324/) | [Email](mailto:borsehardik@gmail.com)

## License
This project is licensed under the **Apache License 2.0**.

