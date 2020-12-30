import './Dashboard.css';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import githubLogo from './img/GitHub-logo.png';
import linkedinLogo from './img/linkedin.png';
import websiteLogo from './img/website.png';
import Header from '../Header/Header';
const Dashboard = (props) => {

  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    props.getUser();

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


  
  
  
  
  const allUsersFiltered = users.filter( (user) => {
      if(nameFilter.length < 2){
        return true
      } else {
        return user.first_name.includes(nameFilter)
      }
    })
    .map(user => {
    
    const [profile] = profiles.filter( profile => profile.user_id === user.user_id);
    
    console.log(`[profile] for user ${user.first_name}`, profile);
    

    if (profile) {
      return (
      <div className="container">
      <div className='box'>
        <img className= 'profile_img'src={profile.profile_pic} alt="profile"/>
        <h2>{user.first_name} {user.last_name}</h2>
        <section className="logos">
        <a href={profile.github} target='_blank' rel="noreferrer">
          <img src={githubLogo} style={{height:'30px', width:'30px'}} alt="github"/>
        </a>
        <a href={profile.linkedin} target='_blank' rel="noreferrer">
          <img src={linkedinLogo} style={{height:'30px', width:'30px'}} alt="linkedin"/>
        </a>
        <a href={profile.portfolio} target='_blank' rel="noreferrer">
          <img src={websiteLogo} style={{height:'30px', width:'30px'}} alt="portfolio"/>
        </a>
        </section>
        <h4>{profile.quote}</h4>
        </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div className="box">
            <li>{user.first_name}</li>
            <li>{user.last_name}</li>
            <li>{user.email}</li>
       </div> 
       </div>
        )
    }
 
  })

    console.log("wtf props", props);

    const capitalizedName = props.user.first_name.replace( 
      /(\w)(\w*)/g, function( g0,g1,g2 ) {
        return g1.toUpperCase() + g2.toLowerCase();
      });

    return(


        <div>
          <Header/>

          <h1>Welcome, {capitalizedName}</h1>
            <h3>Let's get you connected</h3>
          <p>Search by name: 
            <input type="text"
              onChange={(e) => {setNameFilter(e.target.value)}}
        /></p>
        <div className="container container-container">{allUsersFiltered}</div>
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
