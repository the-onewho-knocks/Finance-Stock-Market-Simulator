select * from planned_expenses;

select * from users;

select * from portfolios;

select * from transactions;

select * from planned_expenses;

select * from expenses;

select * from networth;

SELECT table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');

