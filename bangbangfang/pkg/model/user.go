package models

import (
    "time"
)

type User struct {
    ID        uint      `gorm:"primaryKey;autoIncrement"`
    Username  string    `gorm:"type:varchar(50);uniqueIndex;not null"`
    Password  string    `gorm:"type:varchar(100);not null"`
    CreatedAt time.Time `gorm:"autoCreateTime"`
}

func (User) TableName() string { return "users" }