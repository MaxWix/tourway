import React from 'react';
import styles from "./styles.module.scss";
import PlaceholderIMG from "../../../assets/imgs/drexel-overview-2.jpg";

const SummaryTourCard = () => {
      return (
      <div className={styles.summaryTourCard}>
            <div className={styles.summaryTourCardInfo}>
                <p><b>URBN Center</b></p>
                <p>The Westphal College of Media Arts and Design</p>
                <div className={styles.CatWrapper}>
                    <p>Academic</p>
                    <p>Media Arts</p>
                    <p>Design</p>
                </div>
            </div>
            <div className={styles.summaryTourCardIMG}
                style={{ backgroundImage: `url(${PlaceholderIMG})` }}>
            </div>
        </div>
      );
    };
  
export default SummaryTourCard;
