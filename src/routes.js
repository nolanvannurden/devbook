import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard"
import Profile from "./Components/Profile/Profile"
import Register from "./Components/Register/Register"

export default (
	<Switch>
		<Route exact path="/" component={Auth}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/profile" component={Profile}/>
		<Route path="/register" component={Register}/>
	</Switch>
);