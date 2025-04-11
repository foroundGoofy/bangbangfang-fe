package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB // 新增全局DB实例

const (
	host     = "115.190.94.104" // 修改为容器服务名
	port     = 3306
	user     = "root"
	password = "yourpassword"
	dbname   = "bangbangfun"
)

func InitDB() (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("MYSQL_USER"),
		os.Getenv("MYSQL_PASSWORD"),
		os.Getenv("MYSQL_HOST"),
		port,
		os.Getenv("MYSQL_DATABASE"))
	//dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
	//	user,
	//	password,
	//	host,
	//	port,
	//	dbname)

	// 新增日志配置
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // 指定日志输出
		logger.Config{
			SlowThreshold: time.Second, // 慢SQL阈值
			LogLevel:      logger.Info, // 日志级别
			Colorful:      true,        // 彩色打印
		},
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger, // 添加日志配置
	})

	if err != nil {
		return nil, fmt.Errorf("数据库连接失败: %v", err)
	}

	// 配置连接池
	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	DB = db // 初始化全局实例
	fmt.Println("成功连接到MySQL数据库")
	return db, nil
}

// 新增辅助方法
func GetDB() *gorm.DB {
	return DB
}

func Close() error {
	sqlDB, err := DB.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
