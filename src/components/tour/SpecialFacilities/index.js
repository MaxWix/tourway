import React from "react";
import styles from "./styles.module.scss";

const SpecialFacilities = ({ facilitiesIcons = [], facilitiesTextS = [] }) => {
  // If there is no text, return null to hide the container
  if (
    !facilitiesTextS ||
    !facilitiesIcons ||
    facilitiesTextS.length === 0 ||
    facilitiesIcons.length === 0
  ) {
    return null;
  }

  return (
    <div className={styles.specialFacilitiesCon}>
      <ul>
        {facilitiesTextS?.map((text, index) =>
          Array.isArray(facilitiesIcons) && facilitiesIcons[index] ? (
            <li key={index}>
              <div className={styles.iconTextPair}>
                <img src={facilitiesIcons[index]} alt="Facility Icon" />
                <p>{text}</p>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default SpecialFacilities;
