package interfaces

import "github.com/jackc/pgx/v5/pgxpool"

type BaseRepository interface {
	GetDB() *pgxpool.Pool
}
