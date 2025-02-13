import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const UniversityCard = ({ universityName, milesAway, universityIMG, universityLink }) => {
  return (
    <Link to={universityLink}> 
      <div className={styles.universityCard}>
        <img src={universityIMG} alt={universityName} />
        <div className={styles.universityInfo}>
          <h5>{universityName}</h5>
          <div className={styles.milesAway}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/>
            </svg>
            <p>{milesAway}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UniversityCard;
