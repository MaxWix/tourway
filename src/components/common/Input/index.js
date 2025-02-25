import React from "react";
import styles from "../styles.module.scss";

function Input({ placeholder, icon }) {
  return (
    <div className={styles.input}>
      {icon && <span className={styles.inputIcon}>{icon}</span>}
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default Input;
