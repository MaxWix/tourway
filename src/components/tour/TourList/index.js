import React from "react";
import styles from "./styles.module.scss";

const TourList = ({
  matchedStops,
  handleStopClick,
  hasEditMode = false,
  editMode,
  onDeleteClick,
  currentStopIndex,
}) => {
  return (
    <div className={styles.StopsHolder}>
      {matchedStops.length > 0 ? (
        matchedStops.map((stop, index) => (
          <div key={stop.tagId} id={stop.tag}>
            <div
              onClick={() => handleStopClick(stop.tag)}
              style={{ cursor: "pointer" }}
            >
              <p
                className={
                  currentStopIndex
                    ? currentStopIndex === index
                      ? styles.blueCircle
                      : styles.circle
                    : styles.circle
                }
              >
                {index + 1}
              </p>
              <div>
                <h3>{stop.subtitle}</h3>
                <div className={styles.CatWraper}>
                  {stop.categories.map((category, index) => (
                    <p key={index}>{category}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className={styles.duration}>{stop.duration} mins</p>
              </div>
            </div>
            {hasEditMode && editMode && (
              <button
                className={styles.deleteButton}
                onClick={() => onDeleteClick(stop.tagId)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No matching stops found based on your selections.</p>
      )}
      <div className={styles.verticalLine}>&nbsp;</div>
    </div>
  );
};

export default TourList;
