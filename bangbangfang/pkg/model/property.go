package models

import (
	"time"
)

type Property struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	UserID      uint      `gorm:"not null"`
	District    string    `gorm:"type:varchar(20);not null"`
	Address     string    `gorm:"type:text;not null"`
	Floor       int       `gorm:"not null"`
	Layout      string    `gorm:"type:varchar(20);not null"`
	HasElevator bool      `gorm:"type:tinyint(1);default:0"`
	Rent        float64   `gorm:"type:decimal(10,2);not null"`
	Area        float64   `gorm:"type:decimal(6,2);not null"`
	Photos      *string   `gorm:"type:json;default:'[]'"` // 改为指针类型并设置默认值
	CreatedAt   time.Time `gorm:"autoCreateTime"`
}

func (Property) TableName() string { return "properties" }
