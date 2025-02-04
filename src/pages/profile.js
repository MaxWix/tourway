import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import Navbar from "../components/navigation/Navbar";
import Header from "../components/navigation/Header";
import Input from "../components/common/input";
import CircleButton from "../components/common/CircleButton";

import LoginHeader from "../assets/tourway/login-header.jpg";
import TourwayPathSmall from "../assets/icons/path-small.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import LockIcon from "../assets/icons/lock.svg";
import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import AppleIcon from "../assets/icons/apple.svg";

const Profile = () => {
  console.log("Profile");
  return (
    <div className="Profile">
      <Header
        HeaderIMG={LoginHeader}
        showBackButton={true}
        height="300px"
        showSwoop={false}
        showTourwaySwoop={true}
        tourwaySwoopTop="106px"
      />
      <div className="mainContent mainContentLogin">
        <div className="tourwayPathSmall">
          <img src={TourwayPathSmall} />
        </div>
        <h1>Login to Tour</h1>
        <Input
          placeholder="Email"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <Input
          placeholder="Password"
          icon={<img src={LockIcon} alt="Lock Icon" />}
        />
        <div className="loginActions">
          <div className="rememberMe">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <div>
            <p>Forgot Password?</p>
          </div>
        </div>
        <div className="altLoginMethods">
          <p>Log in with</p>
          <div className="socialMedia">
            <a href="#" className="socialMediaLink">
              <button className="socialMediaButton">
                <img src={GoogleIcon} />
              </button>
            </a>
            <a href="#" className="socialMediaLink">
              <button className="socialMediaButton">
                <img src={FacebookIcon} />
              </button>
            </a>
            <a href="#" className="socialMediaLink">
              <button className="socialMediaButton">
                <img src={AppleIcon} />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
