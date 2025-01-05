CREATE DATABASE IF NOT EXISTS login_system;

USE login_system;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    remember_me BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example of inserting a test user (use hashed passwords in a real application)
INSERT INTO users (email, password, remember_me) VALUES
('testuser@example.com', 'password123', FALSE);
