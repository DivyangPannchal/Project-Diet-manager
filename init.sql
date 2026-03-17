-- TDM Initial PostgreSQL Schema

-- Table for users
CREATE TABLE IF NOT EXISTS tbl_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Table for health missions (tasks)
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL
);

-- Seed data for tbl_user (Optional, but included based on project history)
-- INSERT INTO tbl_user (name, username, password) VALUES ('vicky', 'vickymuthu2021@gmail.com', '8e7c905538b4c9a3ecd1295596419995');
