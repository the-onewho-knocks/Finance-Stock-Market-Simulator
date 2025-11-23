The System file architechure of the project is as follows
Finance Simulator/
├── cmd/server/main.go
├── internal/
│   ├── config/
│   │   ├── config.go
│   │   └── redis.go
│   ├── cache/
│   │   ├── redis_client.go
│   │   ├── stock_cache.go
│   │   ├── heatmap_cache.go
│   │   └── dashboard_cache.go
│   ├── middleware/
│   │   ├── auth.go
│   │   └── admin.go
│   ├── stockapi/
│   │   ├── client.go
│   │   ├── yahoo.go
│   │   └── mock.go
│   ├── models/
│   │   ├── user.go
│   │   ├── expense.go
│   │   ├── planned_expense.go
│   │   ├── portfolio.go
│   │   ├── transaction.go
│   │   ├── networth.go
│   │   ├── heatmap.go
│   │   └── admin.go
│   ├── repositories/
│   │   ├── interfaces/
│   │   │   ├── user_repository.go
│   │   │   ├── expense_repository.go
│   │   │   ├── planned_expense_repository.go
│   │   │   ├── portfolio_repository.go
│   │   │   ├── transaction_repository.go
│   │   │   ├── networth_repository.go
│   │   │   ├── admin_repository.go
│   │   │   └── base.go
│   │   ├── pgx/
│   │   │   ├── user_repo.go
│   │   │   ├── expense_repo.go
│   │   │   ├── planned_expense_repo.go
│   │   │   ├── portfolio_repo.go
│   │   │   ├── transaction_repo.go
│   │   │   ├── networth_repo.go
│   │   │   └── admin_repo.go
│   │   └── mock/
│   ├── services/
│   │   ├── user_service.go
│   │   ├── auth_service.go
│   │   ├── expense_service.go
│   │   ├── planned_expense_service.go
│   │   ├── portfolio_service.go
│   │   ├── transaction_service.go
│   │   ├── networth_service.go
│   │   ├── market_service.go
│   │   ├── heatmap_service.go
│   │   ├── dashboard_service.go
│   │   └── admin_service.go
│   ├── handlers/
│   │   ├── auth_handler.go
│   │   ├── user_handler.go
│   │   ├── expense_handler.go
│   │   ├── planned_expense_handler.go
│   │   ├── portfolio_handler.go
│   │   ├── transaction_handler.go
│   │   ├── networth_handler.go
│   │   ├── market_handler.go
│   │   ├── heatmap_handler.go
│   │   ├── dashboard_handler.go
│   │   └── admin_handler.go
│   └── routes/
│       └── routes.go
├── pkg/utils/
│   ├── hash.go
│   └── validator.go
├── go.mod
├── go.sum
└── .env
