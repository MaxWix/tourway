import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.global.scss";

import Navbar from "../components/navigation/Navbar/index";
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
      <div className="mainContent">
        <div className="universityBioContent">
          <h4>Overview</h4>
          <p>
            Drexel is well-known for its cooperative education program (co-op),
            which integrates classroom learning with professional work
            experience. The university offers over 200 degree programs at the
            undergraduate, graduate, and doctoral levels across disciplines such
            as engineering, business, health sciences, arts, and media. Drexel
            is located in University City, a vibrant neighborhood in
            Philadelphia.{" "}
          </p>
          <div>
            <img />
            <img />
          </div>
          <button onClick={goToQuestionnare}>to questionnaire</button>
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default UniversityBio;
