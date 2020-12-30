import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import axios from "axios";
import "./Profile.css";
import Header from "../Header/Header";

const Profile = (props) => {
  // const [input, setInput] = useState({profile_pic: '', linkedin: '', portfolio: '', github: '', quote: ''})
  const [profile_pic, setProfilePic] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [github, setGithub] = useState("");
  const [quote, setQuote] = useState("");

  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/profile/user");
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  const editProfile = async (
    profile_pic,
    linkedin,
    portfolio,
    github,
    quote
  ) => {
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

  // const handleChange = e => {
  //   const {name, value} = e.target;
  //   setInput({...input, [name]: value})
  // }

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />

      <div className="profile-component">
        <div>{console.log(profile)}</div>
        {edit ? (
          <div className="profile-form">
            <div className="profile-component-left">
              <div 
              className="profile-pic-input"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={() => imageUploader.current.click()}
              >
                
                <input
                  className="profile-pic"
                  onChange={handleImageUpload}
                  onChange={(e) => setProfilePic([e.target.files])}
                  value={profile_pic}
                  ref={imageUploader}
    
                  name="profile-pic"
                  type="file"
                  accept="image/*"
                  multiple="false"
                  ref={imageUploader}
                  style={{
                    display: "none"
                  }}
                />
                <img
                className='profile-img'
                alt="Add Profile Photo Here"
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",

                  }}
                /> 
              </div>
          
              </div>

            <div className="profile-component-right">
              <div className="name"></div>

              <div className="linkedin-input">
                <input
                  className="profile-linkedin"
                  placeholder="LinkedIn Link"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  name="linkedin"
                  type="text"
                />
              </div>
              <div className="portfolio-input">
                <input
                  className="profile-portfolio"
                  placeholder="Portfolio Link"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  name="portfolio"
                  type="text"
                />
              </div>
              <div className="github-input">
                <input
                  className="profile-github"
                  placeholder="Github Link"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  name="github"
                  type="text"
                />
              </div>
              <div className="quote-input">
                <input
                  className="profile-quote"
                  placeholder="Add Quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  name="quote"
                  type="text"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="profile">
            <div className="left-profile">
              <div className="profile-pic">{profile.profile_pic}</div>
            </div>

            <div className="right-profile">
              <div className="linkedin">
                <h3>{profile.linkedin}</h3>
              </div>
              <br></br>
              <div className="portfolio">
                <h3>{profile.portfolio}</h3>
              </div>
              <br></br>
              <div className="github">
                <h3>{profile.github}</h3>
              </div>
              <br></br>
              <div className="quote">
                <h3>{profile.quote}</h3>
              </div>
            </div>
          </div>
        )}
        <div className="buttons">
          {edit ? (
            <div className="form-button">
              <div className="profile-buttons">
                <div className="profile-edit-button-container">
                  <button
                    className="profile-edit-button"
                    onClick={() => {
                      editProfile(
                        profile_pic,
                        linkedin,
                        portfolio,
                        github,
                        quote
                      );
                      setEdit(!edit);
                    }}
                  >
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
      </div>
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
