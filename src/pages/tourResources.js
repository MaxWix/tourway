import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import Header from "../components/navigation/Header";
import blueBG from "../assets/imgs/DrexelBlue.svg";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Counselor from "../components/nextsteps/Counselor";
import Resources from "../components/nextsteps/Resources";
import Button from "../components/common/Button";
import HomeIconFilled from '../assets/icons/home-filled.svg';


import FAQIcon from "../assets/icons/faq.svg";
import AdmissionsIcon from "../assets/icons/admission-process.svg";
import ApplicationReqIcon from "../assets/icons/application-requirements.svg";
import UpcomingEventsIcon from "../assets/icons/calendar.svg";
import VoiceoverIcon from "../assets/icons/voiceover.svg";



const TourResources = () => {
const navigate = useNavigate(); 
  console.log("TourResources");
  return (
    <div className="TourResources">
    <Header
      HeaderIMG={blueBG}
      height="150px"
      swoopTop="48px"
      />
      <div className="backButton">
      <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#07294d"
          onClick={() => navigate('/tour/summary')} 
        />
      </div>
      <div className="voiceoverButton">
      <CircleButton
          icon={<img src={VoiceoverIcon} alt="Voiceover Icon" />}
          bgColor="#DFF3F4"
          iconColor="#07294d"
          onClick={() => navigate('/')} 
        />
      </div>
      <div className="exitButton">
      <CircleButton
          icon={<FontAwesomeIcon icon={faXmark} />}
          bgColor="#ffc600"
          iconColor="#07294d"
          onClick={() => navigate('/')} 
        />
      </div>
      <div className="mainContent mainContentResources">
      <h1>Next Steps and Resources</h1>
      <Counselor />
      <div className="resourcesContainer">
        <Resources
        icon={<img src={FAQIcon} alt="FAQ Icon" />}
        text="FAQ" />
        <Resources
        icon={<img src={AdmissionsIcon} alt="Admissions Icon" />}
        text="Admissions Process" />
        <Resources
        icon={<img src={ApplicationReqIcon} alt="Application Requirements Icon" />}
        text="Application Requirements" />
        <Resources
        icon={<img src={UpcomingEventsIcon} alt="Upcoming Events Icon" />}
        text="Upcoming Events" />
      </div>
      </div>
      <div className="CTA-1">
        <Button 
        text="GO TO HOME"
        icon={<img src={HomeIconFilled} alt="FAQ Icon" />}
        bgColor="#07294d"
        borderColor="#07294d"
        action="/" />
      </div>
    </div>
  );
};

export default TourResources;
