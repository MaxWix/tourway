import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navigation/Navbar";
import Header from "../components/navigation/Header";
import Input from "../components/common/Input";
import CircleButton from "../components/common/CircleButton";
import Button from "../components/common/Button";

import LoginHeader from "../assets/tourway/login-header.jpg";
import TourwayPathSmall from "../assets/icons/path-small.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import LockIcon from "../assets/icons/lock.svg";
import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import AppleIcon from "../assets/icons/apple.svg";

const Login = () => {
    const navigate = useNavigate();
  return (
    <div className="Login">
      <Header
        HeaderIMG={LoginHeader}
        showBackButton={true}
        height="300px"
        showSwoop={false}
        showTourwaySwoop={true}
        tourwaySwoopTop="106px"
      />
    <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
          onClick={() => navigate(-1)}
        />
      </div>
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
        <input type="checkbox" id="rememberMeCheckbox" />
        <label htmlFor="rememberMeCheckbox">Remember me</label>
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
                <img src={AppleIcon} />
              </button>
            </a>
            <a href="#" className="socialMediaLink">
              <button className="socialMediaButton">
                <img src={FacebookIcon} />
              </button>
            </a>
          </div>
        </div>
        <div className="loginCTA">
            <Button 
            text="LOG IN"
            action="/"/>
            <div className="loginSecondaryCTA">
                <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                <Button
                text="SIGN UP"
                bgColor="white"
                textColor="#757575"
                action="/signup" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
