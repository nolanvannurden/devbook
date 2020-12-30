UPDATE profile
SET profile_pic = $1, linkedin = $2, portfolio = $3, github = $4, quote = $5
WHERE user_id = $6
<<<<<<< HEAD
=======

>>>>>>> 211d995e6ab311ad7d037c6b6796ad8d8d2a6f4b
RETURNING *;