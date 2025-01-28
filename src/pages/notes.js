import React from "react";
import NavMenu from "../components/navigation/NavMenu";
import Navbar from "../components/navigation/Navbar";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Notes = () => {
  console.log("Notes");
  return (
    <div className="Notes">
      <h1>Notes</h1>
      <NavMenu />
      <div>
        <Navbar />
        <CircleButton 
        icon={faMagnifyingGlass} 
        onClick={() => alert("Go to Add")} 
        bgColor="#0BA3A8" 
        iconColor="#fff" 
      />
      </div>
    </div>
  );
};

export default Notes;
