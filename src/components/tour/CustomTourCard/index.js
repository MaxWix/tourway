import React from "react";
import styles from './styles.module.scss';
import Button from "../../common/Button";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faClock, faLocationDot, faEye } from "@fortawesome/free-regular-svg-icons";
import LocationIconOutline from "../../../assets/icons/location-outline.svg";
import ChatIcon from "../../../assets/icons/chat.svg";
import CustomIcon from "../../../assets/icons/custom.svg";

const CustomTourCard = () => {
  const navigate = useNavigate();

  const goToQuestionnare = () => {
    navigate("/tour/questionnaire");
  };
    return (
    <div className={styles.customTourCard}>
      <div className={styles.customTourCardContent}>
      <div className={styles.customTourCardHeader}>
        <img src={CustomIcon} />
        <h4>Customized Campus Tour</h4>
      </div>
      <div className={styles.customInfo}>
        <h5>Custom:</h5>
        <div className={styles.timeStops}>
        <div className={styles.time}>
            <FontAwesomeIcon icon={faClock} />
            <p>Duration</p>
        </div>
        <div className={styles.stops}>
            <img src={LocationIconOutline} />
            <p>No. of stops</p>
        </div>
        <div className={styles.information}>
            <img src={ChatIcon} />
            <p>Information</p>
        </div>
        </div>
    </div>
    <div>
    <p>Fill out a short questionnaire to create a tour catered to your interests!</p>
    </div>
    </div>
    <div className={styles.tourCardCTA}>
    <Button 
        text="START CUSTOMIZED TOUR"
        onClick={goToQuestionnare} />
      </div>
      </div>
    );
  };

  export default CustomTourCard;