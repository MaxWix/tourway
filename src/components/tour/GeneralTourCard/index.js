import React from "react";
import styles from './styles.module.scss';
import Button from "../../common/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faEye } from "@fortawesome/free-regular-svg-icons";
import LocationIconOutline from "../../../assets/icons/location-outline.svg";
import GeneralIcon from "../../../assets/icons/clipboard.svg";

const GeneralTourCard = () => {
    return (
    <div className={styles.generalTourCard}>
      <div className={styles.generalTourCardContent}>
      <div className={styles.generalTourCardHeader}>
        <img src={GeneralIcon} />
        <h4>General Campus Tour</h4>
      </div>
        <div className={styles.timeStops}>
        <div className={styles.time}>
            <FontAwesomeIcon icon={faClock} />
            <p><span>90</span> mins</p>
        </div>
        <div className={styles.stops}>
            <img src={LocationIconOutline} />
            <p><span>10</span> stops</p>
        </div>
        </div>
    <div>
    <h5>Stops Overview:</h5>
    <p>Dragon Statue  --- URBN Eatery --- Bentley Hall --- LeBow Hall --- Health Sciences Building --- Korman Quad --- Rush Garden <span>+3 stops</span></p>
    </div>
    </div>
    <div className={styles.tourCardCTA}>
    <Button 
        text="START GENERAL TOUR"
        action="#"
        bgColor="#07294D" />
      </div>
      </div>
    );
  };

  export default GeneralTourCard;