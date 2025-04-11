package models

import (
    "time"
)

type UserMessage struct {
    ID        uint      `gorm:"primaryKey;autoIncrement"`
    UserID    uint      `gorm:"not null"`
    Content   string    `gorm:"type:text;not null"`
    IsRead    bool      `gorm:"type:tinyint(1);default:0"`
    CreatedAt time.Time `gorm:"autoCreateTime"`
}

func (UserMessage) TableName() string { return "user_messages" }