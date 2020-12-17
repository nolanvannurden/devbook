require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');


const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

const app = express();

app.use(express.json());


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
// app.post('/auth/register', authctrl.)
// app.post('/auth/login', authctrl.)
// app.post('/auth/logout', authctrl.)
// app.get('/auth/user', authctrl.)


app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));