import React, { useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ accordionOptions, selectedOptions, onChange }) => {
  const [openAccordionIndices, setOpenAccordionIndices] = useState(
    accordionOptions.map((_, index) => index)
  );

  const toggleAccordion = (index) => {
    setOpenAccordionIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Calculate selected count only within the dropdown
  const dropdownSelectedCount = Object.entries(selectedOptions)
    .filter(([key]) =>
      accordionOptions.some((opt) => opt.accordionLabel === key)
    ) // Filter only dropdown selections
    .reduce((acc, [, values]) => acc + values.length, 0);

  const maxSelections = 3;
  const isLimitReached = dropdownSelectedCount >= maxSelections;

  return (
    <div className={styles.dropdownContainer}>
      {accordionOptions.map((accordionOption, index) => {
        const isOpen = openAccordionIndices.includes(index);

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

            {isOpen && (
              <div className={styles.accordionOptions}>
                <Checkbox
                  options={accordionOption.accordionOptions}
                  name={accordionOption.accordionLabel}
                  selectedValues={
                    selectedOptions[accordionOption.accordionLabel] || []
                  }
                  onChange={(name, updatedValues) => {
                    // Ensure that adding a new value does not exceed the limit
                    if (updatedValues.length <= maxSelections) {
                      onChange(name, updatedValues);
                    }
                  }}
                  isLimitReached={isLimitReached}
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
