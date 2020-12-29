import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import axios from 'axios'

const Profile = (props) => {

  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState([])
  // const [getProfile, getProfile] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/profile/user")
        setProfile(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getProfile()
  }, [])

  const editProfile = async (profile_pic, linkedin, portfolio, github, quote) => {
    try {
      const res = await axios.put("/profile/user", {
        profile_pic,
        linkedin,
        portfolio,
        github,
        quote,
      });
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

//NOTE: map over the array

  return (
    <div className="profile-component">

    

      {edit ? (
        <div>
          <div className="profile-component-left">
            <div className="profile-pic-input">
              <input
                className="profile-pic"
                placeholder="Add photo"
                value={profile.profile_pic}
                onChange={(e) => setInput(e.target.value)}
                name="profile-pic"
              
              />
            </div>
          </div>
          <div className="profile-component-right">
            <div className="name"></div>

            <div className="linkedin-input">
              <input
                className="profile-linkedin"
                placeholder="LinkedIn Link"
                value={profile.linkedin}
                onChange={(e) => setInput(e.target.value)}
                name="linkedin"
              />
            </div>
            <div className="portfolio-input">
              <input
                className="profile-portfolio"
                placeholder="Portfolio Link"
                value={profile.portfolio}
                onChange={(e) => setInput(e.target.value)}
                name="portfolio"
              />
            </div>
            <div className="github-input">
              <input
                className="profile-github"
                placeholder="Github Link"
                value={profile.github}
                onChange={(e) => setInput(e.target.value)}
                name="github"
              />
            </div>
            <div className="quote-input">
              <input
                className="profile-quote"
                placeholder="Add Quote"
                value={profile.quote}
                onChange={(e) => setInput(e.target.value)}
                name="quote"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Profile Page</h1>
          {profile.profile_pic}
          {profile.linkedin}
          {profile.portfolio}
        </div>
      )}

      {edit ? (
        <div>
          <div className="profile-buttons">
            <div className="profile-edit-button-container">
              <button className="profile-edit-button" 
              onClick={() => {
                editProfile(profile.profile_pic, profile.linkedin, profile.portfolio, profile.github, profile.quote, input) 
                setEdit(!edit)}}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  getUser,
};
const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
