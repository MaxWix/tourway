import { React, useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


const Dropdown = ({ accordionOptions, selectedOptions, onChange }) => {
  const [openAccordionIndices, setOpenAccordionIndices] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);


  const toggleAccordion = (index) => {
    setOpenAccordionIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  };

  return (
    <div className={styles.dropdownContainer}>
      {accordionOptions.map((accordionOption, index) => {
        const isOpen = openAccordionIndices.includes(index); // Determine if this specific dropdown is open

        return (
        <div key={index} className={styles.accordionSection}>
          <button
            className={styles.accordionLabel}
            onClick={() => toggleAccordion(index)}
            type="button"

          >
            {accordionOption.accordionLabel}
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
          </button>

          {isOpen && openAccordionIndices.includes(index) && (
            <div className={styles.accordionOptions}>
              <Checkbox
                options={accordionOption.accordionOptions}
                name={accordionOption.accordionLabel}
                selectedValues={
                  selectedOptions[accordionOption.accordionLabel] || []
                }
                onChange={onChange}
              />
            </div>
          )}
        </div>
      );
      })}
    </div>
  );
};

export default Dropdown;
