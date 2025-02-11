import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from "../components/navigation/Navbar";
import Header from "../components/navigation/Header";
import Input from "../components/common/Input";
import CircleButton from "../components/common/CircleButton";
import Button from "../components/common/Button";

import LoginHeader from "../assets/tourway/login-header.jpg";
import TourwayPathSmall from "../assets/icons/path-small.svg";
import TourwayPathLogin from "../assets/icons/path-login.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import LockIcon from "../assets/icons/lock.svg";
import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import AppleIcon from "../assets/icons/apple.svg";

const SignUp = () => {
    const navigate = useNavigate();
  return (
    <div className="SignUp">
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
      <div className="mainContent mainContentSignUp">
        <div className="tourwayPathSmall">
          <img src={TourwayPathSmall} />
        </div>
        <h1>Sign Up to Tour</h1>
        <Input
          placeholder="Name"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <Input
          placeholder="Email"
          icon={<img src={LockIcon} alt="Lock Icon" />}
        />
        <Input
          placeholder="Password"
          icon={<img src={LockIcon} alt="Lock Icon" />}
        />
        <Input
          placeholder="Confirm Password"
          icon={<img src={LockIcon} alt="Lock Icon" />}
        />
        <div className="signUpActions">
        <div className="rememberMe">
        <input type="checkbox" id="rememberMeCheckbox" />
        <label htmlFor="rememberMeCheckbox">Receive marketing materials from universities</label>
        </div>
        </div>
        <div className="altSignUpMethods">
          <p>Sign up with</p>
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
        <div className="signUpCTA">
            <Button 
            text="SIGN UP"
            action="/"/>
            <div className="signUpSecondaryCTA">
            <div className="tourwayPathSignUp">
            <img src={TourwayPathLogin}/>
            </div>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
