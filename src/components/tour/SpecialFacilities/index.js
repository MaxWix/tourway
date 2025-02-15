import React from 'react';
import styles from "./styles.module.scss";

const SpecialFacilities = ({ facilitiesTextS }) => {
  if (!facilitiesTextS || facilitiesTextS.length === 0) {
    return null;
  }
  return (
    
    <div className={styles.specialFacilitiesCon}> {/* Container for the list */}
      <ul>
        {facilitiesTextS.map((text, index) => ( // Loop through the array
          <li key={index}>{text}</li> // Create a <li> for each item
        ))}
      </ul>
    </div>
  );
};

export default SpecialFacilities;