module.exports = {
	checkUser: async (req, res, next) => {
			if(req.session.user){
					next()
			}else{
					res.status(403).send('No user logged in!')
			}
	}
}