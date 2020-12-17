CREATE TABLE dev_users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    cohort VARCHAR(50) NOT NULL
);

CREATE TABLE profile (
    profile_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES dev_users(user_id),
    profile_pic TEXT,
    linkedin TEXT,
    portfolio TEXT,
    github TEXT,
    quote TEXT
);