import React from "react";
import '../styles/styles.global.scss';

import NavMenu from "../components/navigation/NavMenu";
import Header from "../components/navigation/Header";

import DrexelOverview from "../assets/imgs/drexel-overview.jpg"

const UniversityBio = () => {
  console.log("UniversityBio");
  return (
    <div className="universityBio">
      <Header HeaderIMG={DrexelOverview}
              headerTitle="Drexel University"
              headerSubtitle="Philadelphia, PA"
              showBackButton={true}
              showHeartButton={true}
              isHearted={false}
               />
    <div className="MainContent">
      <h1>University Bio</h1>
      <NavMenu />
    </div>
    </div>
  );
};

export default UniversityBio;
