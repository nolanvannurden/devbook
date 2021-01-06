import "./Auth.css";
import { useState } from "react";
import { connect } from "react-redux";
import { getUser, loginUser, logoutUser } from "../../redux/userReducer";
import LilJon from "../../Video/liljon.mp4";
import axios from "axios";

const Auth = (props) => {
  const [first_name, setfirstName] = useState("");
  const [last_name, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cohort, setCohort] = useState("");
  const [newUser, setNewUser] = useState(false);

  const loggingInUser = async () => {
    try {
      const user = await axios.post("/auth/login", { email, password });
      props.loginUser(user.data);
      props.history.push("/dashboard");
      console.log(user.data);
      console.log("Merry Christmas");
    } catch (err) {
      console.log(err);
    }
  };

  const registerNewUser = () => {
    axios
      .post("/auth/register", {
        first_name,
        last_name,
        email,
        password,
        cohort,
      })
      .then((newUser) => {
        props.loginUser(newUser.data);
        console.log(newUser.data);
        console.log("Merry Christmas");
        registerNewProfile();
      })
      .catch((err) => console.log(err));
  };

  let profile_pic = "profilepic";
  let linkedin = "yourlinkedin";
  let portfolio = "yourportfolio";
  let github = "yourgithub";
  let quote = "yourbestquote";
  let user_id = props.user.userId;

  const registerNewProfile = async () => {
    axios
      .post("/profile/add", {
        profile_pic,
        linkedin,
        portfolio,
        github,
        quote,
        user_id,
      })
      .then((newProfile) => {
        console.log(newProfile);
        handleSend();
        props.history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleSend = async () => {
    try {
      const sentEmail = await axios.post("/email", { email });
      alert("Email Sent");
      console.log(sentEmail);
    } catch (err) {
      console.log(err);
    }
  };

  let leftFrag = "<";
  let rightFrag = "/>";

  return (
    <div className="entireAuthPage">
      {newUser ? (
        <div>
          <div className="registerBox">
            <h1>Register</h1>
            <div></div>
            <div className="registerItems">
              <div className="boxContainer">
                <div className="titleContainer">
                  <h3>First Name</h3>
                  <h3>Last Name</h3>
                  <h3>Email</h3>
                  <h3>Password</h3>
                  <h3>Cohort</h3>
                </div>
                <div className="inputContainer">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(event) => setfirstName(event.target.value)}
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(event) => setlastName(event.target.value)}
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <input
                    name="cohort"
                    placeholder="Cohort"
                    value={cohort}
                    onChange={(event) => setCohort(event.target.value)}
                  />
                </div>
              </div>
              <button className="registerbtn" onClick={() => registerNewUser()}>
                Create Account
              </button>
              {/* <button className="registerbtn" onClick={() => handleSend()}>
                Send Email
              </button> */}
              <button
                className="newAcctBtn"
                onClick={() => setNewUser(!newUser)}
              >
                Already a User?
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="loginPortion">
          <div className="aboutBox">
            <div className="aboutBoxItems">
              <h1>
                Welcome to {leftFrag}Devbook{rightFrag}
              </h1>
              <p>
                {leftFrag}Devbook{rightFrag} was created as a social media
                yearbook platform for Devmountain alumni
              </p>
              <p>-WR6</p>
            </div>
          </div>
          <div className="loginBox">
            <h1>Sign In</h1>
            <div></div>
            <div className="registerItems">
              <div className="boxContainer">
                <div className="logintitleContainer">
                  <h3>Email</h3>
                  <h3>Password</h3>
                </div>
                <div className="inputContainer">
                  <input
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <button className="registerbtn" onClick={() => loggingInUser()}>
                Login
              </button>
              <button
                className="needanAccount"
                onClick={() => setNewUser(!newUser)}
              >
                Need an Account?
              </button>
            </div>
          </div>
        </div>
      )}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src={LilJon} type="video/mp4" />
      </video>
      <footer className="footer" style={{ color: "#ebebeb" }}>
        We do not own the rights to this video
      </footer>
      <footer className="footermobile">
        We do not own the rights to this image
      </footer>
    </div>
  );
};

const mapDispatchToProps = {
  getUser,
  loginUser,
  logoutUser,
};
const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
