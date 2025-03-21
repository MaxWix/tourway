import React from "react";
import styles from "./styles.module.scss";
import trashIcon from "../../../assets/icons/trash.svg";

const TourList = ({
  matchedStops,
  handleStopClick,
  hasEditMode = false,
  editMode,
  onDeleteClick,
  currentStopIndex,
  yellowCircles = false,
}) => {
  return (
    <div className={styles.StopsHolder}>
      {matchedStops.length > 0 ? (
        matchedStops.map((stop, index) => (
          <div key={stop.tagId} id={stop.tag}>
            <div>
              <div
                className={styles.numNamCat}
                onClick={() => handleStopClick(stop.tag)}
              >
                <p
                  className={
                    !yellowCircles
                      ? currentStopIndex === index
                        ? styles.blueCircle
                        : currentStopIndex > index
                        ? styles.previousCircle
                        : styles.circle
                      : styles.blueCircle
                  }
                >
                  {index + 1}
                </p>
                <div>
                  <h3
                    className={
                      currentStopIndex === index
                        ? styles.active
                        : currentStopIndex > index
                        ? styles.previous
                        : ""
                    }
                  >
                    {stop.subtitle}
                  </h3>
                  <div
                    className={
                      currentStopIndex === index
                        ? styles.activeCatWraper
                        : currentStopIndex > index
                        ? styles.previousCatWraper
                        : styles.CatWraper
                    }
                  >
                    {stop.categories.map((category, index) => (
                      <p key={index}>{category}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                {hasEditMode && editMode ? (
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDeleteClick(stop.tagId)}
                  >
                    <img src={trashIcon} />
                  </button>
                ) : (
                  <p
                    className={
                      currentStopIndex === index
                        ? styles.activeDuration
                        : currentStopIndex > index
                        ? styles.previousDuration
                        : styles.duration
                    }
                  >
                    {stop.duration} mins
                  </p>
                )}
              </div>
            </div>
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
