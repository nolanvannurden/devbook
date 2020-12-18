import "./Auth.css"
import {useState} from 'react'
import {connect} from "react-redux"
import {getUser, loginUser} from "../../redux/userReducer"
import axios from "axios"
const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const loggingInUser = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post('/auth/login',{email, password})
            loginUser(user.data)
            props.history.push("/dashboard")
            console.log(user.data)
        }
        catch (err) {
            console.log(err)
        }
    }




    return(
        <div>
            <input
                name="email"
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}/>
            <input
                name="password"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}/>
            <button onClick={() => loggingInUser()}>Login</button>
        </div>
    )
}

const mapDispatchToProps = {
    getUser,
  };
const mapStateToProps = (reduxState) => {
    const {user, isLoggedIn} = reduxState
    return {
        user,
        isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)