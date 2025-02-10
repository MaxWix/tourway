import React from "react";
import styles from './styles.module.scss';
import CircleButton from "../../common/CircleButton";
import Button from "../../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import DrexelLogo from "../../../assets/imgs/drexel-logo.png";
import LocationIconOutline from "../../../assets/icons/location-outline.svg";

const InProgressCard = () => {
    return (
    <div className={styles.progressCard}>
      <div className={styles.progressCardHeader}>
        <div className={styles.progressCardHeaderUni}>
        <img src={DrexelLogo}/>
        <div className={styles.universityTitle}>
            <h4>Drexel University</h4>
            <p>Ongoing tour</p>
        </div>
        </div>
        <CircleButton 
        icon={<FontAwesomeIcon icon={faXmark} />}
        onClick={() => alert("")} 
        bgColor="#0BA3A8" 
        iconColor="#fff" 
      />
      </div>
      <div className={styles.timeStops}>
        <div className={styles.time}>
            <FontAwesomeIcon icon={faClock} />
            <p><span>40</span> mins left</p>
        </div>
        <div className={styles.stops}>
            <img src={LocationIconOutline} />
            <p><span>6/10</span> stops</p>
        </div>
    </div>
      <div className={styles.stopsRemaining}>
        <h5>Stops Remaining</h5>
        <div>
        <p>Mario Statue --- URBN Center --- Urban Eatery --- Bentley --- LeBow Business School<span> +1 stop</span></p>
        </div>
      </div>
      <div className={styles.progressCardCTA}>
      <CircleButton 
        icon={<FontAwesomeIcon icon={faPen} />} 
        onClick={() => alert("")} 
        bgColor="#0BA3A8" 
        iconColor="#fff" 
      /> 
      <Button
      text="CONTINUE"
      icon={<FontAwesomeIcon icon={faArrowRightLong} />}
      height="46px"  /> 
      </div>
      </div>
    );
  };

  export default InProgressCard;