import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/userReducer";
import { connect } from "react-redux";
import axios from "axios";
import "./Profile.css";
import Header from "../Header/Header";
import {useHistory} from 'react-router-dom'

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
      const res = await axios.put("/profile/edit", {
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

  // const handleCancel = () => {
  //   let history = useHistory()
  // }

  // const handleChange = e => {
  //   const {name, value} = e.target;
  //   setInput({...input, [name]: value})
  // }

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    console.log("handleImageUpload (e):", e);
    const [file] = e.target.files;
    console.log("[file]", file);

    if (file) {
      
      axios.get("/api/signedrequest", {
        params: {"file-name": file.name, "file-type": file.type}
      })
      .then( (signedRes) => {

        const { signedRequest, url } = signedRes.data;
        
        axios.put(
          signedRequest, file, 
          {headers: {'Content-Type': file.type, 'x-amz-acl': 'public-read'}})
          .then( (uploadRes) => {
            console.log("uploadRes?:", uploadRes);
            setProfilePic(url);
          })

      })
      .catch( (err) => {console.log("Get signed request err:", err)})
      

      // Get signed request from S3

      // Use the signed request

      const reader = new FileReader();

      const { current } = uploadedImage;

      current.file = file;
      console.log("current before (e):", current);

      reader.onload = (e) => {
        console.log("reader.onload e:", e)
        current.src = e.target.result;
        console.log("current in (e):", current);
      };

      reader.readAsDataURL(file);
      
    }
  };

  let history = useHistory()
  return (
    <div>
      <Header />

      <div className="profile-component">
        <div>{console.log(profile)}</div>
        {edit ? (
          <div className="profile-form">
            <div className="profile-form-photo">
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
                  //onChange={(e) => setProfilePic([e.target.files])}
                  //value={imageUploader.current.value}
                  ref={imageUploader}
    
                  name="profile-pic"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  capture style="display:none"
                  ref={imageUploader}
                  style={{
                    display: "none"
                  }}
                />
                <img
                className='profile-img-form'
                  src="https://cdn.discordapp.com/attachments/789197223237910528/789287051991973938/devbook-logo.png"
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer"

                  }}
                /> 
              </div>
                  
              </div>
              <h2 className='profile-name'>{props.user.first_name}</h2>
            <div className="profile-form-info">
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
              <br></br>
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
              <br></br>
              <div className="github-input">
                <input
                  className="profile-github"
                  placeholder= "Github Link"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  name="github"
                  type="text"
                />
              </div>
              <br></br>
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
            
              <div className="profile-pic"><img className= 'profile-img' src={profile.profile_pic} alt="profile"/></div>
              <h2 className='profile-name'>{props.user.first_name}</h2>
            </div>

            <div className="right-profile">
              <div className="linkedin">
                <h3 className='profile-info'>{profile.linkedin}</h3>
              </div>
              <br></br>
              <div className="portfolio">
                <h3 className='profile-info'>{profile.portfolio}</h3>
              </div>
              <br></br>
              <div className="github">
                <h3 className='profile-info'>{profile.github}</h3>
              </div>
              <br></br>
              <div className="quote">
                <h3 className='profile-info'>{profile.quote}</h3>
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
                    className='save-button'
                    onClick={() => {
                      setProfilePic(profile.profile_pic)
                      setLinkedin(profile.linkedin)
                      setPortfolio(profile.portfolio)
                      setGithub(profile.github)
                      setQuote(profile.quote)
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
                <div>
                  <button
                  className='cancel-button'
                  onClick={() => history.goBack()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
              className='edit-button'
                onClick={() => {
                  setProfilePic(profile.profile_pic)
                  setLinkedin(profile.linkedin)
                  setPortfolio(profile.portfolio)
                  setGithub(profile.github)
                  setQuote(profile.quote)
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
