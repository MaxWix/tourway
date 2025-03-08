import React from "react";
import styles from "./styles.module.scss";

const Button = ({
  width = "100%",
  height = "3.75rem",
  text = "Button",
  icon,
  bgColor = "#0BA3A8",
  textColor = "#FFFFFF", // New prop for text color
  borderColor = "#0BA3A8", // New prop for border color
  iconColor = "#FFFFFF", // New prop for icon color
  action = "#",
  onClick,
}) => {
  const buttonStyle = {
    width: width,
    height: height,
    backgroundColor: bgColor,
    color: textColor,
    border: `2px solid ${borderColor}`,
  };

  const textStyle = {
    color: textColor,
  };

  const iconStyle = {
    color: iconColor,
  };

  return (
    <div className={styles.CTAButtonContainer}>
      <a href={action} className={styles.CTAButtonLink} onClick={onClick}>
        <button className={styles.CTAButton} style={buttonStyle}>
          {text && <p className={styles.text} style={textStyle}>{text}</p>}
          {icon && (
            <span className={styles.icon} style={iconStyle}>
              {icon}
            </span>
          )}
        </button>
      </a>
    </div>
  );
};

export default Button;
