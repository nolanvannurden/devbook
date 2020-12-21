import "./Auth.css"
import {useState} from 'react'
import {connect} from "react-redux"
import {getUser, loginUser} from "../../redux/userReducer"
import axios from "axios"
const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const loggingInUser = async (e) => {
        
        try {
            const user = await axios.post('/auth/login',{email, password})
            props.loginUser(user.data)
            // props.history.push("/dashboard")
            console.log(user.data)
            console.log("Merry Christmas")
        }
        catch (err) {
            console.log(err)
        }
    }
    const getUserTest = async (e) => {
        
        try {
            props.getUser()
            console.log(props.user)
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
            <button onClick={() => getUserTest()}>GetUser</button>
        </div>
    )
}

const mapDispatchToProps = {
    getUser,
    loginUser
  };
const mapStateToProps = (reduxState) => {
    const {user, isLoggedIn} = reduxState
    return {
        user,
        isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)