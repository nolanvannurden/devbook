INSERT INTO dev_users (first_name, last_name, email, password, cohort)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;