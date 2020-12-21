import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import axios from 'axios'

const Profile = (props) => {

  const [input, setInput] = useState(props.profile)
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    props.getUser()
  })

  const saveEdit = async () => {
    const { profile_pic, linkedin, portfolio, github, quote } = props;
    console.log(props.profile)
    try {
      const profile = await axios.put("/profile/user", {
        profile_pic,
        linkedin,
        portfolio,
        github,
        quote,
      });
      getUser(profile.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="profile-component">
      {edit ? (
        <div>
          <div className="profile-component-left">
            <div className="profile-pic-input">
              <input
                className="profile-pic"
                placeholder="Add photo"
                value={props.profile_pic}
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
                value={props.linkedin}
                onChange={(e) => setInput(e.target.value)}
                name="linkedin"
              />
            </div>
            <div className="portfolio-input">
              <input
                className="profile-portfolio"
                placeholder="Portfolio Link"
                value={props.portfolio}
                onChange={(e) => setInput(e.target.value)}
                name="portfolio"
              />
            </div>
            <div className="github-input">
              <input
                className="profile-github"
                placeholder="Github Link"
                value={props.github}
                onChange={(e) => setInput(e.target.value)}
                name="github"
              />
            </div>
            <div className="quote-input">
              <input
                className="profile-quote"
                placeholder="Add Quote"
                value={props.quote}
                onChange={(e) => setInput(e.target.value)}
                name="quote"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Profile Page</h1>
          {props.profile_pic}
          {props.linkedin}
          {props.portfolio}
        </div>
      )}

      {edit ? (
        <div>
          <div className="profile-buttons">
            <div className="profile-edit-button-container">
              <button className="profile-edit-button" 
              onClick={() => {
                saveEdit(props.profile_pic, props.linkedin, props.portfolio, props.github, props.quote) 
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
