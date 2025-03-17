import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import Navbar from "../components/navigation/Navbar";
import CircleButton from "../components/common/CircleButton";
import Header from "../components/navigation/Header";
import SearchBar from "../components/common/SearchBar";
import NotesCard from "../components/notes/NotesCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import NotesHeader from "../assets/tourway/notes-header.jpg";
import NotesHeaderGraphic from "../assets/tourway/notes-header-graphic.png";
import TourwayPath from "../assets/icons/path.svg";
import UPennLogo from "../assets/imgs/upenn-logo.png";
import DrexelLogo from "../assets/imgs/drexel-logo.png";

const Notes = () => {
  return (
    <div className="Notes">
      <Header
        HeaderIMG={NotesHeader}
        showSwoop={false}
        showTourwaySwoop={true}
      />
      <div className="headerGraphic headerGraphicNotes">
        <img src={NotesHeaderGraphic} />
      </div>
      <div className="mainContent">
        <SearchBar placeholder="Search tour notes" />
        <div className="tourwayPath">
          <img src={TourwayPath} />
        </div>
        <h2>Your Notes</h2>
        <NotesCard
          universityName="University of Pennsylvania"
          status="Ongoing tour"
          showButton={true}
          imageSrc={UPennLogo}
        />
        <NotesCard
          universityName="Drexel University"
          status="Completed on Thursday, 1/15"
          showButton={false}
          imageSrc={DrexelLogo}
        />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Notes;
