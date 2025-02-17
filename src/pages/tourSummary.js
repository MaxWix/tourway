import React from "react";
import Header from "../components/navigation/Header";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";
import SummaryHeader from "../assets/tourway/summary-header.jpg"
import SummaryHeaderGraphic from "../assets/tourway/summary-header-graphic.png";
import VoiceoverIcon from "../assets/icons/voiceover.svg"; 
import SummaryNotesCard from "../components/notes/SummaryNotesCard";



const TourSummary = () => {
const navigate = useNavigate(); 
  console.log("TourSummary");
  return (
    <div className="TourSummary">
    <Header
      HeaderIMG={SummaryHeader}
      height="200px"
      swoopTop="126px"
      />
      <div className="headerGraphic headerGraphicSummary">
        <img src={SummaryHeaderGraphic} />
      </div>
      <div className="headerTextSummary">
        <h4>Congratulations!</h4>
        <p>You've finished your tour at <b>Drexel University!</b></p>
      </div>
      <div className="backButton">
      <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#07294d"
          onClick={() => navigate('/tour/review')} 
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
      <div className="mainContent mainContentSummary">
      <h1>Tour Summary</h1>
      <SummaryNotesCard />
      <div className="tourSummary">
      <p>Click on a stop to view it again if you wish!</p>
      </div>
      

      </div>
      <div className="CTA-1">
        <Button 
        text="END TOUR"
        icon={<FontAwesomeIcon icon={faXmark} />}
        bgColor="#07294d"
        borderColor="#07294d"
        action="/tour/resources" />
      </div>
    </div>
  );
};

export default TourSummary;
