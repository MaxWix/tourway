import React, { useState } from "react";
import styles from "./styles.module.scss";

const Radio = ({ options = [], name, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setSelectedValue(value);
    onChange(value); // Pass the selected value to the parent component or backend
  };

  return (
    <div>
      {options?.map((option) => (
        <div className={styles.optionContainer} key={option.id}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            className={styles.hiddenRadio}
            id={`radio-${option.id}`}
          />
          <label htmlFor={`radio-${option.id}`} className={styles.optionLabel}>
            <span className={styles.radioCircle}></span>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
