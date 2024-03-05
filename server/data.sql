CREATE DATABASE authentification;

CREATE TABLE todos (
    -- id SERIAL PRIMARY KEY,
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255)
);