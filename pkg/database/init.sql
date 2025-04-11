CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    district VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    floor INT NOT NULL,
    layout VARCHAR(20) NOT NULL,
    has_elevator BOOLEAN DEFAULT false,
    rent NUMERIC(10,2) NOT NULL,
    area NUMERIC(6,2) NOT NULL,
    photos TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    property_id INT REFERENCES properties(id),
    match_score NUMERIC(3,1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matching_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT REFERENCES users(id),
    search_criteria JSONB NOT NULL,
    progress SMALLINT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初始化测试消息
INSERT INTO user_messages (user_id, content) VALUES 
(1, '请确认是否可以办理租赁备案'),
(1, '潜在租客咨询养宠物事宜');

-- 初始化管理员账户
INSERT INTO users (username, password) VALUES ('admin', '888888');

-- 模拟房源数据
INSERT INTO properties (user_id, district, address, floor, layout, has_elevator, rent, area) VALUES
(1, '杨浦区', '民星小区', 4, '一室一厅', true, 2800, 45.5),
(1, '杨浦区', '国和小区', 5, '一室一厅', false, 2700, 42.0),
(1, '杨浦区', '市区三村', 2, '两室一厅', true, 2850, 55.0);

-- 初始化匹配记录
INSERT INTO matching_records (id, user_id, search_criteria, progress, status) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 1, '{"budget": 3000, "district": "杨浦区"}', 100, 'completed');