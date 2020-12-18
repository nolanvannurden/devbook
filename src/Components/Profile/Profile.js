import React from "react";


export default function Profile() {
  return (
    <div className="profile-component">
      <form>
        <div className="profile-component-left">
          <div className="profile-pic-input">
            <input />
          </div>
        </div>
        <div className="profile-component-right">
          <div className="name"></div>

          <div className="linkedin-input">
            <input />
          </div>
          <div className="portfolio-input">
            <input />
          </div>
          <div className="github-input">
            <input />
          </div>
          <div className="quote-input">
            <input />
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
