import React from "react";
import styles from "./styles.module.scss";
import CircleButton from "../../common/CircleButton";
import editIcon from "../../../assets/icons/edit.svg";
import stopsIcon from "../../../assets/icons/location-outline.svg";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TourTimeandStops = ({ totalDuration, stopCount, onEditClick, editMode }) => {
  return (
    <div className={styles.TimeStopsHolder}>
      <div>
        <img src={stopsIcon} />
        <p>{stopCount} stops</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faClock} />
        <p>{totalDuration} mins</p>
      </div>
      {editMode ? (
          <CircleButton
          icon={<FontAwesomeIcon icon={faXmark} />}
          bgColor="#FFD74D"
          iconColor="#07294D"
          onClick={onEditClick}
        />
      )
      : (
        <CircleButton
            icon={<img src={editIcon} />}
            bgColor="#FFD74D"
            iconColor="#07294D"
            onClick={onEditClick}
          />
        )
      }
      
    </div>
  );
};

export default TourTimeandStops;
