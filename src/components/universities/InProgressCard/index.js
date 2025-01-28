import React from "react";
import styles from './styles.module.scss';
import CircleButton from "../../common/CircleButton";

const InProgressCard = () => {
    return (
    <div className={styles.progressCard}>
      <div className={styles.cardHeader}>
        <img/>
        <div className={styles.universityTitle}>
            <h4>Drexel University</h4>
            <p>Ongoing tour</p>
        </div>
        <CircleButton 
        icon={faMagnifyingGlass} /* edit icon */
        onClick={() => alert("")} 
        bgColor="#0BA3A8" 
        iconColor="#fff" 
      />
      </div>
      <div className={styles.timeStops}>
        <div>
            <svg></svg>
            <p>40 mins left</p>
        </div>
        <div>
            <svg></svg>
            <p>6/10 stops left</p>
        </div>
      </div>
      <div className={styles.stopsRemaining}>
        <p>Stops Remaining</p>
        <div>
        <p>Mario Statue --- URBN Center --- Urban Eatery --- Bentley --- LeBow Business School</p>
        <span>+1 stop</span>
        </div>
      </div>
      <div className={styles.CTA}>
      <CircleButton 
        icon={faMagnifyingGlass} 
        onClick={() => alert("")} 
        bgColor="#0BA3A8" 
        iconColor="#fff" 
      /> 
      </div>
      </div>
    );
  };