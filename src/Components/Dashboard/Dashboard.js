import './Dashboard.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import githubLogo from './img/GitHub_logo.png';
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
      return (
      <div className="container">
      <div className='box'>
        <img src={profile.profile_pic}/>
        <h2>finished profile for {user.first_name}</h2>
        <a href={profile.github} target='_blank'>
          <img src={githubLogo} style={{height:'30px', width:'30px'}}/>
        </a>
        <li>LinkedIn : {profile.linkedin}</li>
        <li>Portfolio : {profile.portfolio}</li>
        <h4>{profile.quote}</h4>
        </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div className="box">
            <li>unfinished profile for {user.first_name}</li>
       </div> 
       </div>
        )
    }
 
  })

    return(


        <div>
          <h1>Header Component Will Go Here</h1>
          <p>Welcome, {props.user.email}</p>
        <div className="container container-container">{allUsers}</div>
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
