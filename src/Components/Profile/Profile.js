import React, { useState } from "react";
import { getUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import axios from 'axios'

const Profile = (props) => {
  const [state, setState] = useState({
    profile_pic: "",
    linkedin: "",
    portfolio: "",
    github: "",
    quote: "",
  });

  const [edit, setEdit] = useState(false);

  const saveEdit = async () => {

    const { profile_pic, linkedin, portfolio, github, quote } = state;
    

    try {
      const profile = await axios.post("profile/edit", {
        profile_pic,
        linkedin,
        portfolio,
        github,
        quote,
      });
      getUser(profile.data);
    props.history.push("/profile/user");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div className="profile-component">
      {edit ? (
        <div>
          <div className="profile-component-left">
            <div className="profile-pic-input">
              <input
                className="profile-pic"
                placeholder="Add photo"
                onChange={(e) => changeHandler(e)}
                name="profile_pic"
              />
            </div>
          </div>
          <div className="profile-component-right">
            <div className="name"></div>

            <div className="linkedin-input">
              <input
                className="profile-linkedin"
                placeholder="LinkedIn Link"
                onChange={(e) => changeHandler(e)}
                name="linkedin"
              />
            </div>
            <div className="portfolio-input">
              <input
                className="profile-portfolio"
                placeholder="Portfolio Link"
                onChange={(e) => changeHandler(e)}
                name="portfolio"
              />
            </div>
            <div className="github-input">
              <input
                className="profile-github"
                placeholder="Github Link"
                onChange={(e) => changeHandler(e)}
                name="github"
              />
            </div>
            <div className="quote-input">
              <input
                className="profile-quote"
                placeholder="Add Quote"
                onChange={(e) => changeHandler(e)}
                name="quote"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Profile Page
        </div>
      )}

      {edit ? (
        <div>
          <div className="profile-buttons">
            <div className="profile-edit-button-container">
              <button className="profile-edit-button" onClick={() => saveEdit(props.profile_pic, props.linkedin, props.portfolio, props.github, props.quote)}>
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
