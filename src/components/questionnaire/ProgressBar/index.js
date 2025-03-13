import React from "react";
import styles from "./styles.module.scss";

const ProgressBar = ({ questions, currentQuestion, onStepClick }) => {
  return (
    <div className={styles.progressBar}>
      {questions.map((_, index) => {
        const isActive = index <= currentQuestion;
        const isNextActive = index + 1 <= currentQuestion; // Check if the next step is active

        return (
          <div key={index} className={styles.stepWrapper}>
            <div
              className={`${styles.step} ${isActive ? styles.activeStep : ""}`}
              onClick={() => onStepClick(index)}
            >
              <span className={styles.number}>{index + 1}</span>
            </div>

            {/* Add connector line between steps (except last step) */}
            {index < questions.length - 1 && (
              <div
                className={`${styles.progressSegment} ${
                  isActive && isNextActive
                    ? styles.activeSegment // Dark blue if both steps are active
                    : styles.inactiveSegment // Light blue otherwise
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
