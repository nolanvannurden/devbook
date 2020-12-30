const bcrypt = require('bcrypt')

module.exports = {
	register: async (req, res) => {
		const db = req.app.get('db');
		const {first_name, last_name, email, password, cohort} = req.body;
		const foundUser = await db.check_user(email);
			if (foundUser[0]){
				return res.status(400).send('email already registered')
			}
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			const [newUser] = await db.add_user([first_name, last_name, email, hash, cohort]);
			req.session.user = {
				userId: newUser.user_id,
				first_name: newUser.first_name,
				last_name: newUser.last_name,
				email: newUser.email,
				cohort: newUser.cohort
			}
			res.status(200).send(req.session.user)
	},

	login: async (req, res) => {
		const db = req.app.get('db');
		const {email, password} = req.body;
		const [foundUser] = await db.check_user(email);
			if (!foundUser) {
				return res.status(401).send('incorrect login information')
			}
			const authenticated = bcrypt.compareSync(password, foundUser.password)
			if (authenticated){
				req.session.user = {
					first_name: foundUser.first_name,
					user_id: foundUser.user_id,
					email: foundUser.email,
				}
				res.status(200).send(req.session.user);
			} else {
				res.status(401).send('incorrect login information')
			}
	},

	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},

	getUser: (req, res) => {
		if(req.session.user){
			res.status(200).send(req.session.user)
		} else {
			res.status(202).send('please log in')
		}
	}
}