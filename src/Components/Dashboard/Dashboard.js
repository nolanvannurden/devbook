import './Dashboard.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
const Dashboard = (props) => {

    return(
        <div><h1>Dashboard</h1>
          <p>Welcome, {props.user.email}</p>

          <p>{props.isLoggedIn ? "You are logged in": "You are not logged in"}</p>
        </div>
    )
}


const mapDispatchToProps = {
  getUser
};
const mapStateToProps = (reduxState) => {
  const {user, isLoggedIn} = reduxState
  return {
      user,
      isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
