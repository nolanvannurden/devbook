import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Profile() {
//   const [state, setState] = useState({
//     profile_pic: "",
//     linkedin: "",
//     portfolio: "",
//     github: "",
//     quote: "",
//   });

//   const addProfile = async (e) => {
//     e.preventDefault();
//     const { profile_pic, linkedin, portfolio, github, quote } = state;

//     const history = useHistory();

//     try {
//       const profile = await axios.post("profile/add", {
//         profile_pic,
//         linkedin,
//         portfolio,
//         github,
//         quote,
//       });
//       getUser(user.data);
//       history.push("/profile/user");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const changeHandler = (e) =>
//     setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div className="profile-component">
      <form>
        {/* onSubmit={(e) => addProfile(e)} */}
        <div className="profile-component-left">
          <div className="profile-pic-input">
            <input
            //   className="profile-pic"
            //   placeholder="Add photo"
            //   onChange={(e) => changeHandler(e)}
            //   name="profile_pic"
            />
          </div>
        </div>
        <div className="profile-component-right">
          <div className="name"></div>

          <div className="linkedin-input">
            <input
            //   className="profile-linkedin"
            //   placeholder="LinkedIn Link"
            //   onChange={(e) => changeHandler(e)}
            //   name="linkedin"
            />
          </div>
          <div className="portfolio-input">
            <input
            //   className="profile-portfolio"
            //   placeholder="Portfolio Link"
            //   onChange={(e) => changeHandler(e)}
            //   name="portfolio"
            />
          </div>
          <div className="github-input">
            <input
            //   className="profile-github"
            //   placeholder="Github Link"
            //   onChange={(e) => changeHandler(e)}
            //   name="github"
            />
          </div>
          <div className="quote-input">
            <input
            //   className="profile-quote"
            //   placeholder="Add Quote"
            //   onChange={(e) => changeHandler(e)}
            //   name="quote"
            />
          </div>
        </div>
        <div className="profile-buttons">
          <div className="profile-edit-button">
            <button className="profile-edit-button" type="submit">
              Edit
            </button>
          </div>
          <div className="profile-save-button">
            <button className="profile-save-button" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

