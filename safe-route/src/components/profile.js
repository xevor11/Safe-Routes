import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className="profile-container">
      <div className="header">
        <img src={user.picture} alt={user.name} className="avatar" />
        <div className="header-text">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <a href="#">Edit Profile</a>
        </div>
      </div>
      <div className="main-content">
        <div className="left-panel">
          <h3>About</h3>
          <p>{user.name} is a frequent traveler who loves exploring new places and trying new foods. She has visited over 20 countries and is always planning her next adventure. In her free time, she enjoys hiking, reading, and learning new languages.</p>
        </div>
        <div className="right-panel">
          <h3>Places Visited</h3>
          <ul>
            <li>Milwaukee</li>
          </ul>
        </div>
      </div>
    </div>
  );
}