package pgx

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/models"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/repositories/interfaces"
)

type PortfolioRepositoryPgx struct {
	db *pgxpool.Pool
}

func NewPortfolioRepository(db *pgxpool.Pool) interfaces.PortfolioRepository {
	return &PortfolioRepositoryPgx{db: db}
}

func (r *PortfolioRepositoryPgx) GetDB() *pgxpool.Pool {
	return r.db
}

func (r *PortfolioRepositoryPgx) GetPortfolio(userID string) ([]models.PortfolioItem, error) {
	query := `
		select id ,user_id , stock_symbol , quantity , avg_price , created_at , updated_at
		from portfolio_items where user_id = $1
	`
	ctx := context.Background()
	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []models.PortfolioItem
	for rows.Next() {
		var p models.PortfolioItem
		err := rows.Scan(&p.ID, &p.UserID, &p.StockSymbol, &p.Quantity, &p.AvgPrice, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		res = append(res, p)
	}
	return res, nil
}

func (r *PortfolioRepositoryPgx) BuyStock(item *models.PortfolioItem) error {
	query := `
	insert into portfolio_items (id , user_id , stock_symbol , quantity,avg_price,created_at , updated_at)
	values ($1 , $2 ,$3 ,$4 , $5 , now() , now())
	on conflict (user_id , stock_symbol) do update
	set quantity = portfolio_items.quantity + excluded.quantity ,
	avg_price = (
	case
		when portfolio_items.quantity = 0 then excluded.avg_price
		else(
			(portfolio_items.avg_price * portfolio_items.quantity)
			+ (excluded.avg_price * excluded.quantity)
		) / (portfolio_items.quantity + excluded.quantity)
		end
	),
	updated_ay = now()
	`
	id := uuid.New()
	_, err := r.db.Exec(context.Background(), query,
		id,
		item.UserID,
		item.StockSymbol,
		item.Quantity,
		item.AvgPrice,
	)

	return err
}

func (r *PortfolioRepositoryPgx) SellStock(userID string, stockSymbol string, quantity int) error {

}

func (r *PortfolioRepositoryPgx) GetStockHolding(userID string, stockSymbol string) (*models.PortfolioItem, error) {

}
