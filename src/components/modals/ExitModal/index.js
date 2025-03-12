import React from "react";
import styles from "./styles.module.scss";

const ExitModal = ({ setIsExitModalOpen, handleExitTour }) => {
  return (
    <div className={styles.exitModalOverlay}>
      <div className={styles.exitModalCon}>
        <h2>Exit Tour</h2>
        <p>Are you sure you want to leave the tour?</p>
        <button>Pause</button>
        <button onClick={handleExitTour}>Exit</button>
        <button onClick={() => setIsExitModalOpen(false)}>Continue Tour</button>
      </div>
    </div>
  );
};

export default ExitModal;
