import React from "react";
import styles from "./styles.module.scss";
import CircleButton from "../../common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import bookmarkIcon from "../../../assets/icons/bookmark.svg";
import pauseIcon from "../../../assets/icons/pause.svg";
import finishIcon from "../../../assets/icons/finish.svg";
const ExitModal = ({ setIsExitModalOpen, handleExitTour }) => {
  return (
    <div className={styles.exitModalOverlay}>
      <div className={styles.exitModalCon}>

      <div className={styles.modalHeader}>
          <div>
            <img src={bookmarkIcon} />
            <h2>Pause Tour</h2>
          </div>
            <CircleButton
            icon={<FontAwesomeIcon icon={faXmark} />}
            bgColor="#D0E4F6"
            iconColor="#07294D"
            onClick={() => setIsExitModalOpen(false)}
          />
        </div>
        <div className={styles.modalContent}>
          <p>Would you like to pause this tour for later or end this tour now?</p>
          <button>Pause Tour<span><img src={pauseIcon}/></span></button>
          <button onClick={handleExitTour}>End Tour<span><img src={finishIcon}/></span> <span></span></button>
          <button className={styles.underLink} onClick={() => setIsExitModalOpen(false)}>Continue Tour</button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
