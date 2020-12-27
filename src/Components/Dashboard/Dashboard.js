import './Dashboard.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import Axios from 'axios';
import {useState, useEffect} from 'react';
const Dashboard = (props) => {

  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    
    async function getAllUsers() {
      const users = await Axios.get('/api/users');
      setUsers(users.data);
    }

    async function getAllProfiles() {
      const profiles = await Axios.get('/api/profiles');
      setProfiles(profiles.data)
    }

    getAllProfiles();
    getAllUsers();
   
  }, []);


  


  const allUsers = users.map(user => {

    const [profile] = profiles.filter( profile => profile.user_id === user.user_id);

    console.log(`[profile] for user ${user.first_name}`, profile);

    if (profile) {
      return (<li>Fancy profile for {user.first_name}</li>)
    } else {
      return (<li>lame profile for {user.first_name}</li>)
    }
 
  })

    return(


        <div><h1>Dashboard</h1>
          <p>Welcome, {props.user.email}</p>
        {allUsers}
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
