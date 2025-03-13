import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({
  options = [],
  name,
  selectedValues,
  onChange,
  isLimitReached = false,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Prevent selection if the limit is reached (only applies to Dropdown checkboxes)
    if (checked && isLimitReached && !selectedValues.includes(value)) return;

    let updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);

    onChange(name, updatedValues);
  };

  return (
    <div>
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        return (
          <div className={styles.optionContainer} key={option.id}>
            <input
              type="checkbox"
              name={name}
              id={option.id}
              value={option.value}
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={isLimitReached && !isChecked} // Disable only if at the limit and not already checked
              className={styles.hiddenCheckbox}
            />
            <label
              htmlFor={option.id}
              className={`${styles.optionLabel} ${
                isLimitReached && !isChecked ? styles.disabled : ""
              }`}
            >
              <span className={styles.checkmark}>
                <FontAwesomeIcon icon={faCheck} size="xl" />
              </span>
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
