CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE laptops (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    serial_number VARCHAR(100) UNIQUE,
    model VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE theft_reports (
    id SERIAL PRIMARY KEY,
    laptop_id INT REFERENCES laptops(id),
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending'
);