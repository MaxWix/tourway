import React from "react";
import styles from "./styles.module.scss";

const ProgressBar = ({ questions, currentQuestion, onStepClick }) => {
  return (
    <div className={styles.progressBar}>
      {questions.map((_, index) => (
        <div
          key={index}
          className={`${styles.step} ${
            index === currentQuestion ? styles.activeStep : ""
          }`}
          onClick={() => onStepClick(index)}
        >
          <span>{index + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
