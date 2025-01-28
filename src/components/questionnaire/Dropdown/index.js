import React, { useState } from "react";
import Checkbox from "../Checkbox"; // Import Checkbox component
import styles from "./styles.module.scss"; // Your CSS module

const Dropdown = ({ accordionOptions }) => {
  // State to track which accordion sections are open
  const [openAccordionIndices, setOpenAccordionIndices] = useState([]);

  const toggleAccordion = (index) => {
    if (openAccordionIndices.includes(index)) {
      // If the section is already open, close it
      setOpenAccordionIndices(openAccordionIndices.filter((i) => i !== index));
    } else {
      // Otherwise, open it
      setOpenAccordionIndices([...openAccordionIndices, index]);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      {accordionOptions.map((accordionOption, index) => (
        <div key={index} className={styles.accordionSection}>
          <button
            className={styles.accordionLabel}
            onClick={() => toggleAccordion(index)} // Toggle the specific accordion section
          >
            {accordionOption.accordionLabel}
          </button>

          {openAccordionIndices.includes(index) && ( // Check if the section is open
            <div className={styles.accordionOptions}>
              <Checkbox
                options={accordionOption.accordionOptions}
                name={accordionOption.accordionLabel}
                onChange={(selectedValues) => console.log(selectedValues)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
