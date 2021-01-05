import "./Header.css";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/userReducer";

const Header = (props) => {
  return (
    <header>
      <nav className="nav-header">
        <meta name="viewport" content="width=560, initial-scale=1"></meta>
        <img
          className="devbook-img"
          src="https://cdn.discordapp.com/attachments/789197223237910528/789287051991973938/devbook-logo.png"
        />
        <div className="nav-links">
          <div className="home-css">
            <Link style={{ color: "#Ff5a36" }} to="/">
              Home
            </Link>
          </div>
          <div className="dashboard-css">
            <Link style={{ color: "#Ff5a36" }} to="/Dashboard">
              Dashboard
            </Link>
          </div>
          <div className="profile-css">
            <Link style={{ color: "#Ff5a36" }} to="/Profile">
              Profile
            </Link>
          </div>

          <div>
            <button
              className="logout"
              style={{ color: "#FF5a36" }}
              onClick={() => {
                props.logoutUser(); //front-end
                axios
                  .post("/auth/logout") //back-end
                  .then(() => props.history.push("/"));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default connect(null, { logoutUser })(withRouter(Header));
