module.exports = {

	
	getProfile: async (req, res) => {
			const db = req.app.get('db')
			const {user_id} = req.session.user

			try {
					const profile = await db.get_profile_id([+user_id])
					res.status(200).send(profile)
			}catch(err){
					console.log(`Not your profile`, err)
					res.sendStatus(500)
			}
	},
	addProfile: async (req, res) => {
		const db = req.app.get('db')
		const {profile_pic, linkedin, portfolio, github, quote} = req.body
		const {user_id} = req.session.user
		try {
				const profile = await db.add_profile([profile_pic, linkedin, portfolio, github, quote, +user_id])
				console.log('HIT')
				res.status(200).send(profile)
		}catch(err){
				console.log(`Error adding to profile`, err)
				res.sendStatus(500)
		}
	},
	editProfile: async (req, res) => {
        const db = req.app.get('db')
        const {profile_pic, linkedin, portfolio, github, quote} = req.body
        const {user_id} = req.session.user
				
        try {
						const profile = await db.edit_profile([profile_pic, linkedin, portfolio, github, quote, +user_id])
            res.status(200).send(profile)
        }catch(err){
            console.log(`You cannot edit this profile`, err)
            res.sendStatus(500)
        }
    },
}