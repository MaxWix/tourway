import React from "react";
import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CircleButton = ({
  icon = faUser,
  bgColor = "#0BA3A8",
  iconColor = "#ffffff",
  action = "#",
}) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    color: iconColor,
  };

  return (
    <a href={action} className={styles.circleButtonLink}>
      <button className={styles.circleButton} style={buttonStyle}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </a>
  );
};

export default CircleButton;
