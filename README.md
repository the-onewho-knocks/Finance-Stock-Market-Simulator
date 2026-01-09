# FINANCE SIMULATION BACKEND

This repository hosts a production-grade financial simulation backend built using Go and Clean Architecture principles.
The system simulates real-world portfolio management, transactions, expenses, market data ingestion, and financial analytics.

## The project demonstrates:-
1) Clean Architecture & domain separation
2) RESTful APIs using Chi router
3) Redis-based caching strategy
3) PostgreSQL persistence using pgx
4) External stock market API integrations
5) Scalable, testable backend design

## Table of Contents:-
1) Overview
2) Architecture Diagram
3) System Components
4) API Design & Routes
5) Technology Stack
6) Getting Started
7) Usage
8) Future Improvements
9) Author
10) License

## Architecture Diagram:-
Below is a high-level overview of the system architecture:

<img width="2345" height="2962" alt="arc" src="https://github.com/user-attachments/assets/49f2665f-dc6d-4fd9-a395-dc3051996a7a" />

## Core Design Principles:-
1) Separation of Concerns – Each layer has a well-defined role
2) Dependency Injection – Services depend on interfaces, not implementations
3) Thin Controllers – Handlers only translate HTTP to business calls
4) Explicit Caching – Redis used intentionally, not implicitly
5) Fail-Safe Design – Panic recovery and graceful shutdown
6) Scalable by Default – Designed for horizontal scaling

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





