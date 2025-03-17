import React from "react";
import "../styles/styles.global.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar/index";
import Header from "../components/navigation/Header";
import CircleButton from "../components/common/CircleButton";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import DrexelOverview from "../assets/imgs/drexel-overview1.jpg";
import DrexelOverview1 from "../assets/imgs/drexel-overview-1.jpg";
import DrexelOverview2 from "../assets/imgs/drexel-overview-2.jpg";
import DrexelOverview3 from "../assets/imgs/drexel-overview-3.jpg";

import ScrollButtons from "../components/navigation/ScrollButtons";

const headers = ["Overview", "Financial Aid", "Public Safety at Drexel"];
const UniversityBio = () => {
  const navigate = useNavigate();

  return (
    <div className="universityBio">
      <Header
        HeaderIMG={DrexelOverview}
        headerTitle="Drexel University"
        headerSubtitle="Philadelphia, PA"
      />
      <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="favButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faHeart} />}
          bgColor="#DFF3F4"
          iconColor="#0BA3A8"
        />
      </div>

      <div className="mainContent">
        <div className="uniBioScrollCon">
          <ScrollButtons
            headers={headers}
            scrollOffset={-130}
            topBuffer={40}
            bottomBuffer={40}
          />
        </div>
        <div className="universityBioContent">
          <h3>Overview</h3>
          <p>
            Drexel is well-known for its cooperative education program (co-op),
            which integrates classroom learning with professional work
            experience. The university offers over 200 degree programs at the
            undergraduate, graduate, and doctoral levels across disciplines such
            as engineering, business, health sciences, arts, and media. Drexel
            is located in University City, a vibrant neighborhood in
            Philadelphia.
          </p>
          <div className="overviewIMGs">
            <img
              src={DrexelOverview1}
              alt="Photograph of exterior of Rush Student Center"
            />
            <img
              src={DrexelOverview2}
              alt="interior of the URBN Center's stairs, and exposed beaming"
            />
          </div>
          <h3>Financial Aid</h3>
          <p>
            From scholarships to loans to work-study and more, take a look at
            the best ways to fund your education and what to complete to make
            the most of these opportunities.
          </p>
          <ul>
            <li>
              Prospective Students – If you are applying to Drexel as a new
              student, check out how to apply for financial aid and the
              different resources available to you.
            </li>
            <li>
              Current Student Financial Aid Information – Current Drexel
              students can review a list of popular topics and information to
              help them with the financial aid process.
            </li>
            <li>
              Financial Aid Eligibility – Learn more about how aid eligibility
              is determined, maintained, and changes your status. You can also
              review financial aid terms and conditions.
            </li>
            <li>
              Grants and Scholarships – Discover more about available grants and
              scholarships. 
            </li>
          </ul>
          <h3>Public Safety at Drexel</h3>
          <div className="overviewIMG">
            <img
              src={DrexelOverview3}
              alt="Drexel's public safety officers tabling and talking to a student"
            />
          </div>
          <p>
            Drexel's Department of Public safety's holistic, community-oriented
            approach to safety includes: foot, bike and vehicle patrols by our
            internationally accredited police department and contracted security
            officers, a state-of-the-art dispatch center staffed 24/7, walking
            escort services, DrexelALERT text messages to relay timely
            information and stay connected to the community, and the use of
            technologies including closed-circuit cameras, blue-light emergency
            phones and the Drexel Guardian app. Officers regularly monitor the
            data and coordinate with other local law enforcement agencies and
            community organizations to respond to changing needs. Additionally,
            the Fire and Emergency Services unit provides information and
            resources to address fire safety, medical emergencies and emergency
            preparedness services at Drexel.
          </p>
        </div>
      </div>
      <div className="CTA">
        <Button
          text="TAKE A TOUR"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
          bgColor="#07294d"
          borderColor="#07294d"
          action="/university/choose-tour"
        />
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default UniversityBio;
