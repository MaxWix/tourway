import React from "react";
import styles from "./styles.module.scss";

const Radio = ({ options = [], name, selectedValue, onChange }) => {
  const handleRadioChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div>
      {options?.map((option) => (
        <div className={styles.optionContainer} key={option.id}>
          <input
            type="radio"
            name={name}
            id={option.id}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            className={styles.hiddenRadio}
          />
          <label htmlFor={option.id} className={styles.optionLabel}>
            <span className={styles.radioCircle}></span>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
