import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.global.scss";

import NavMenu from "../components/navigation/NavMenu";
import Header from "../components/navigation/Header";

import DrexelOverview from "../assets/imgs/drexel-overview.jpg";

const UniversityBio = () => {
  const navigate = useNavigate();

  const goToQuestionnare = () => {
    navigate("/tour/questionnaire");
  };

  console.log("UniversityBio");
  return (
    <div className="universityBio">
      <Header
        HeaderIMG={DrexelOverview}
        headerTitle="Drexel University"
        headerSubtitle="Philadelphia, PA"
        showBackButton={true}
        showHeartButton={true}
        isHearted={false}
      />
      <div className="MainContent">
        <h1>University Bio</h1>
        <NavMenu />
        <button onClick={goToQuestionnare}>go to questionnare</button>
      </div>
    </div>
  );
};

export default UniversityBio;
