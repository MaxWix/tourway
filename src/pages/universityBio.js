import React from "react";
import '../styles/styles.global.scss';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar/index';
import Header from "../components/navigation/Header";
import CircleButton from "../components/common/CircleButton";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import DrexelOverview from "../assets/imgs/drexel-overview.jpg";
import DrexelOverview1 from "../assets/imgs/drexel-overview-1.jpg";
import DrexelOverview2 from "../assets/imgs/drexel-overview-2.jpg";

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
        <div className="universityBioContent">
          <h4>Overview</h4>
          <p>
            Drexel is well-known for its cooperative education program (co-op), which integrates classroom learning with professional work experience. The university offers over 200 degree programs at the undergraduate, graduate, and doctoral levels across disciplines such as engineering, business, health sciences, arts, and media. Drexel is located in University City, a vibrant neighborhood in Philadelphia.
          </p>
          <div className="overviewIMGs">
            <img src={DrexelOverview1}/>
            <img src={DrexelOverview2}/>
          </div>
          <h4>Financial Aid</h4>
          <p>From scholarships to loans to work-study and more, take a look at the best ways to fund your education and what to complete to make the most of these opportunities.</p>
          <ul>
            <li>Prospective Students – If you are applying to Drexel as a new student, check out how to apply for financial aid and the different resources available to you.</li>
            <li>Current Student Financial Aid Information – Current Drexel students can review a list of popular topics and information to help them with the financial aid process.</li>
            <li>Financial Aid Eligibility – Learn more about how aid eligibility is determined, maintained, and changes your status. You can also review financial aid terms and conditions.</li>
            <li>Grants and Scholarships – Discover more about available grants and scholarships. </li>
          </ul>
        </div>
      </div>
      <div className="CTA">
        <Button 
        text="TAKE A TOUR"
        icon={<FontAwesomeIcon icon={faArrowRightLong} />}
        bgColor="#07294d" />
        <button onClick={goToQuestionnare}>go to questionnare</button>
      </div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default UniversityBio;
