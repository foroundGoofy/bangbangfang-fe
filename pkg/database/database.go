package database

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "bangbangfang"
)

func InitDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, fmt.Errorf("数据库连接失败: %v", err)
	}

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("数据库连通性测试失败: %v", err)
	}

	fmt.Println("成功连接到PostgreSQL数据库")
	return db, nil
}