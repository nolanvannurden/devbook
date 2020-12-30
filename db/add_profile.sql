INSERT INTO profile (profile_pic, linkedin, portfolio, github, quote, user_id)
VALUES ($1, $2, $3, $4, $5)
WHERE user_id = $6
RETURNING *;