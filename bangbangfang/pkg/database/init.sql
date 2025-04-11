-- 新增数据库创建语句
CREATE DATABASE IF NOT EXISTS bangbangfun CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bangbangfun;

-- 已有表结构保持不变，增加数据库前缀
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    district VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    floor INT NOT NULL,
    layout VARCHAR(20) NOT NULL,
    has_elevator TINYINT(1) DEFAULT 0,
    rent DECIMAL(10,2) NOT NULL,
    area DECIMAL(6,2) NOT NULL,
    photos JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE user_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 初始化数据部分保持不变
INSERT INTO user_messages (user_id, content) VALUES
(1, '请确认是否可以办理租赁备案'),
(1, '潜在租客咨询养宠物事宜');

INSERT INTO users (username, password) VALUES ('admin', '888888');

INSERT INTO properties (user_id, district, address, floor, layout, has_elevator, rent, area) VALUES
(1, '杨浦区', '民星小区', 4, '一室一厅', 1, 2800.00, 45.50),
(1, '杨浦区', '国和小区', 5, '一室一厅', 0, 2700.00, 42.00),
(1, '杨浦区', '市区三村', 2, '两室一厅', 1, 2850.00, 55.00);

-- 在初始化数据部分新增（保持原有数据不变）
INSERT INTO properties (user_id, district, address, floor, layout, has_elevator, rent, area, photos) VALUES
-- 殷高路7弄1号（电梯房）
(1, '杨浦区', '殷高路7弄1号', 6, '一室一厅', 1, 2900.00, 45.5, '[]'),
-- 财经大学附近（非电梯）
(1, '杨浦区', '政立路500号', 5, '两室一厅', 0, 5000.00, 98.5, '[]'),
-- 新江湾转租房
(1, '杨浦区', '仁德路100弄', 6, '三室两厅', 1, 2200.00, 120.0, '["https://example.com/room1.jpg"]');