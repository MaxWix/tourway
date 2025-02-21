import React from 'react';
import styles from "./styles.module.scss";

const SpecialFacilities = ({ facilitiesIcons, facilitiesTextS }) => {
  // If there is no text, return null to hide the container
  if (!facilitiesTextS || facilitiesTextS.length === 0) {
    return null;
  }

  return (
    <div className={styles.specialFacilitiesCon}>
      <ul>
        {facilitiesTextS.map((text, index) => (
          // Ensure the icon exists before rendering
          facilitiesIcons[index] && (
            <li key={index}>
              <div className={styles.iconTextPair}>
                <img src={facilitiesIcons[index]} alt="Facility Icon" />
                <p>{text}</p>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default SpecialFacilities;