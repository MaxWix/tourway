import { React, useState } from "react";
import styles from "./styles.module.scss";

const Checkbox = ({ options = [], name, onChange }) => {
  console.log("checkbox");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);

    setSelectedValues(updatedValues);
    onChange(updatedValues); // Pass updated values to parent component or backend
  };

  return (
    <div>
      {options.map((option) => (
        <div className={styles.optionContainer} key={option.id}>
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={handleCheckboxChange}
            className={styles.hiddenCheckbox}
            id={`checkbox-${option.id}`}
          />
          <label
            htmlFor={`checkbox-${option.id}`}
            className={styles.optionLabel}
          >
            <span className={styles.checkmark}></span>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
