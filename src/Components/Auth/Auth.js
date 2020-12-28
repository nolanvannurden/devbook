import "./Auth.css";
import { useState } from "react";
import { connect } from "react-redux";
import { getUser, loginUser, logoutUser } from "../../redux/userReducer";
import LilJon from "../../Video/liljon.mp4";
import axios from "axios";
const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loggingInUser = async (e) => {
    try {
      const user = await axios.post("/auth/login", { email, password });
      props.loginUser(user.data);
      // props.history.push("/dashboard")
      console.log(user.data);
      console.log("Merry Christmas");
    } catch (err) {
      console.log(err);
    }
  };

  let leftFrag = "<";
  let rightFrag = "/>";

  return (
    <div className="entireAuthPage">
      <div className="aboutBox">
        <div id="aboutBoxItems">
          <h1>
            Welcome to {leftFrag}Devbook{rightFrag}
          </h1>
          <p>
            {leftFrag}Devbook{rightFrag} was created as social media platform
            for Devmountain alumni
          </p>
        </div>
      </div>
      <div className="loginBox">
        <h1>Sign In</h1>
        <div></div>
        <div className="loginItems">
          <div className="userName">
            <h3>Username</h3>

            <input
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="passWord">
            <h3>Password</h3>
            <input
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="btn" onClick={() => loggingInUser()}>
            Login
          </button>
        </div>
      </div>
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
