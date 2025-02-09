import React from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  console.log("NavMenu");
  return (
    <div className="NavMenu">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/notes">Notes</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/university/1">University Bio</Link>
          </li>
          <li>
            <Link to="/university/choose-tour">Choose Tour</Link>
          </li>
          <li>
            <Link to="/tour/questionnaire">Questionnaire</Link>
          </li>
          <li>
            <Link to="/tour/overview">Tour Overview</Link>
          </li>
          <li>
            <Link to="/tour">Tour View</Link>
          </li>
          <li>
            <Link to="/tour/review">Tour Review</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
