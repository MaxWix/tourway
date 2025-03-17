import React from "react";
import { useNavigate } from "react-router-dom";
import NavMenu from "../components/navigation/NavMenu";
import Header from "../components/navigation/Header";
import CircleButton from "../components/common/CircleButton";
import Navbar from "../components/navigation/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import DrexelChooseTour from "../assets/imgs/drexel-choosetour.jpg";
import DrexelLogo from "../assets/imgs/drexel-logo.png";
import CustomTourCard from "../components/tour/CustomTourCard";
import GeneralTourCard from "../components/tour/GeneralTourCard";

const ChooseTour = () => {
  const navigate = useNavigate();

  return (
    <div className="chooseTour">
      <Header HeaderIMG={DrexelChooseTour} height="155px" swoopTop="56px" />
      <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="mainContent mainContentChooseTour">
        <div className="universityInfo">
          <img src={DrexelLogo} />
          <div>
            <h3>Drexel University</h3>
            <p>Pick your preferred tour!</p>
          </div>
        </div>
        <CustomTourCard />
        <GeneralTourCard />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default ChooseTour;
