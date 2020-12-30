UPDATE profile
SET profile_pic = $1, linkedin = $2, portfolio = $3, github = $4, quote = $5
WHERE user_id = $6
<<<<<<< HEAD
=======

>>>>>>> b88d2ebbfd716bbecd6ebe63fb096d7d2e53b7d0
RETURNING *;