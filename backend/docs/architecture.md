finance-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yaml                         # CI: build, test, lint
│   │   └── deploy.yaml                     # Optional CD pipeline
│   └── ISSUE_TEMPLATE.md
├── .vscode/
│   └── settings.json
├── cmd/
│   ├── api/
│   │   └── main.go                         # API server entrypoint (Gin)
│   └── worker/
│       └── main.go                         # Background worker / job runner
├── configs/
│   ├── config.dev.yaml
│   ├── config.prod.yaml
│   └── config.test.yaml
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.worker
│   └── docker-compose.yml
├── docs/
│   ├── architecture.md
│   ├── api-spec.md                         # High-level API endpoints
│   ├── dev-setup.md
│   └── runbook.md
├── internal/
│   ├── api/
│   │   ├── routes.go                       # Route registration
│   │   └── version.go
│   ├── auth/
│   │   ├── oauth_google.go                 # Google OAuth helpers
│   │   ├── jwt.go                          # JWT generation/validation
│   │   └── middleware.go                   # Auth middleware for Gin
│   ├── user/
│   │   ├── model.go
│   │   ├── repository.go                   # DB queries for users
│   │   ├── service.go                      # Business logic
│   │   └── handler.go                      # HTTP handlers
│   ├── portfolio/
│   │   ├── model.go
│   │   ├── repository.go
│   │   ├── service.go                      # buy/sell, P&L, order logic
│   │   ├── simulator.go                    # order execution simulator
│   │   └── handler.go
│   ├── market/
│   │   ├── provider/                       # adapters to external providers
│   │   │   ├── provider_interface.go
│   │   │   ├── alphavantage.go
│   │   │   └── polygon.go
│   │   ├── fetcher.go                      # ingestion & normalization
│   │   ├── cache.go                        # redis caching helpers
│   │   ├── heatmap.go                      # compute heatmap snapshots
│   │   └── handler.go
│   ├── expense/
│   │   ├── model.go
│   │   ├── repository.go
│   │   ├── service.go                      # recurring expansion, budgets
│   │   └── handler.go
│   ├── analytics/
│   │   ├── service.go                      # monthly overview, aggregates
│   │   └── handler.go
│   ├── websocket/
│   │   ├── hub.go                          # central hub for WS clients
│   │   ├── client.go                       # per-connection client
│   │   ├── message.go
│   │   └── handler.go                      # upgrade HTTP -> websocket
│   ├── middleware/
│   │   ├── logging.go                      # request logging middleware
│   │   ├── cors.go
│   │   └── rate_limit.go
│   ├── db/
│   │   ├── conn.go                         # connects to Postgres (pgx)
│   │   ├── migrations.go                   # run migrations programmatically
│   │   └── queries/                        # SQLC or hand-written queries
│   │       ├── users.sql
│   │       ├── portfolios.sql
│   │       └── market_snapshots.sql
│   ├── cache/
│   │   └── redis.go                        # Redis client and helpers
│   ├── jobs/
│   │   ├── market_updater.go               # periodic fetch & publish
│   │   ├── heatmap_worker.go
│   │   └── order_matcher.go                # for limit order processing
│   ├── mail/                               # optional: email (notifications)
│   │   └── smtp.go
│   ├── models/                             # shared DTOs used across packages
│   │   └── types.go
│   ├── utils/
│   │   ├── time.go
│   │   ├── money.go                        # decimal helpers (shopspring/decimal)
│   │   └── id.go                           # UUID helpers
│   └── config/
│       └── config.go                       # load viper/env into struct
├── pkg/
│   ├── logger/
│   │   └── zap.go                          # zap logger wrapper
│   ├── errors/
│   │   └── errors.go                       # typed errors & HTTP mapping
│   ├── response/
│   │   └── api_response.go                 # uniform JSON response helpers
│   └── middleware/                         # generic middleware reusable across apps
├── migrations/
│   ├── 001_init_schema.up.sql
│   ├── 002_portfolio_tables.up.sql
│   ├── 003_expenses.up.sql
│   └── rollback/                           # corresponding down.sql files
├── scripts/
│   ├── dev_seed.go                         # seed DB with demo data
│   ├── gen_proto.sh                        # generate protobuf / grpc stubs
│   └── run_local.sh
├── web/
│   ├── README.md
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.jsx
│       ├── routes/
│       │   ├── Dashboard.jsx
│       │   ├── Portfolio.jsx
│       │   ├── Market.jsx
│       │   ├── Calendar.jsx
│       │   └── AuthCallback.jsx
│       ├── components/
│       │   ├── charts/
│       │   │   └── PriceChart.jsx
│       │   ├── Heatmap.jsx
│       │   └── Layout.jsx
│       ├── services/
│       │   ├── api.js                       # axios wrapper, auth handling
│       │   └── ws.js                        # websocket client & subscription
│       └── styles/
│           └── globals.css
├── test/
│   ├── integration/
│   │   ├── api_flow_test.go
│   │   └── portfolio_flow_test.go
│   └── unit/
│       ├── portfolio_service_test.go
│       └── market_fetcher_test.go
├── tools/
│   ├── devcontainer.json
│   └── scripts_for_ci/
├── .env.example
├── .dockerignore
├── .gitignore
├── go.mod
├── go.work
├── Makefile
├── README.md
└── LICENSE



this is the complete file architecture
