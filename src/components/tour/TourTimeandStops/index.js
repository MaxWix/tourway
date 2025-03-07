import React from "react";
import styles from "./styles.module.scss";
import CircleButton from "../../common/CircleButton";
import editIcon from "../../../assets/icons/edit.svg";
import stopsIcon from "../../../assets/icons/location-outline.svg";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TourTimeandStops = ({ totalDuration, stopCount, onEditClick }) => {
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
      <CircleButton
        icon={<img src={editIcon} />}
        bgColor="#D0E4F6"
        iconColor="#07294D"
        onClick={onEditClick}
      />
    </div>
  );
};

export default TourTimeandStops;
