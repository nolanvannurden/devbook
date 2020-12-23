import './Dashboard.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
const Dashboard = (props) => {

    return(
        <div>Dashboard</div>
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
