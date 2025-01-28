import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import Navbar from "../components/navigation/Navbar";

const Profile = () => {
  console.log("Profile");
  return (
    <div className="Profile">
      <h1>Profile</h1>
      <NavMenu />
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
