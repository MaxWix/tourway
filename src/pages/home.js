import React from "react";
import "../styles/styles.global.scss";

import NearYou from "../components/universities/NearYou";
import UniversityList from "../components/universities/UniversityList";
import Header from "../components/navigation/Header";
import SearchBar from "../components/common/SearchBar";
import Navbar from "../components/navigation/Navbar";

import ASULogo from "../assets/logos/asu-logo.png";
import BostonLogo from "../assets/logos/boston-logo.png";
import CornellLogo from "../assets/logos/cornell-logo.png";
import DrexelLogo from "../assets/logos/drexel-logo.png";
import EmersonLogo from "../assets/logos/emerson-logo.png";
import SJULogo from "../assets/logos/sju-logo.png";
import TempleLogo from "../assets/logos/temple-logo.png";
import UPennLogo from "../assets/logos/upenn-logo.png";

import HomeHeader from "../assets/tourway/home-header.jpg";
import HomeHeaderGraphic from "../assets/tourway/home-header-graphic.png";
import TourwayPath from "../assets/icons/path.svg";

const universities = [
  { name: "Arizona State University", logo: ASULogo },
  { name: "Boston University", logo: BostonLogo },
  { name: "Cornell University", logo: CornellLogo },
  { name: "Drexel University", logo: DrexelLogo },
  { name: "Emerson College", logo: EmersonLogo },
  { name: "Saint Joseph's University", logo: SJULogo },
  { name: "Temple University", logo: TempleLogo },
  { name: "University of Pennsylvania", logo: UPennLogo },
];

const Home = () => {
  return (
    <div className="home">
      <Header
        HeaderIMG={HomeHeader}
        showSwoop={false}
        showTourwaySwoop={true}
      />
      <div className="headerGraphic">
        <img src={HomeHeaderGraphic} />
      </div>
      <div className="mainContent">
        <SearchBar placeholder="Search colleges" />
        <div className="tourwayPath">
          <img src={TourwayPath} />
        </div>
        <NearYou />
        <div>
          <UniversityList universities={universities} />
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
