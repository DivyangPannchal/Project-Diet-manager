-- Create database if it does not exist
CREATE DATABASE IF NOT EXISTS todo_list;

-- Switch to the created database
USE todo_list;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL
);
