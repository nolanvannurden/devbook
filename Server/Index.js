require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authctrl = require('./Controllers/authController')
const proctrl = require('./Controllers/profileController')
const userctrl = require('./Controllers/userController')
const s3ctrl = require('./Controllers/s3Controller');
const nodemail = require('./Controllers/emailController')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const {checkUser} = require('./Controllers/middleware')

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/../build'))


app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: SESSION_SECRET,
	cookies: {
		maxAge: 1000 * 60 * 60 * 24
	}
}))

massive({
	connectionString: CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
}) .then (db => {
	app.set('db', db)
	console.log('DB connected')
}) .catch (err => console.log(err));

//ENDPOINTS 
app.post('/auth/register', authctrl.register)
app.post('/auth/login', authctrl.login)
app.post('/auth/logout', authctrl.logout);
app.get('/auth/user', authctrl.getUser)
//dashboard endpoints 
app.get('/api/users', userctrl.getAllUsers)
app.get('/api/profiles', proctrl.getAllProfiles)
app.get('/api/signedrequest', s3ctrl.getSignedRequest)


app.post('/profile/add', checkUser, proctrl.addProfile )
app.get('/profile/user', checkUser, proctrl.getProfile)
app.put("/profile/edit", checkUser, proctrl.editProfile)

//Email
app.post("/email", nodemail.email)


app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));