import React from 'react';
import styles from './styles.module.scss'; 

const Button = ({
  width = '100%',
  height = '3.75rem',
  text = 'Button',
  icon,
  bgColor = '#0BA3A8', 
  action = '#',
  onClick,
}) => {
  const buttonStyle = {
    width: width,
    height: height,
    backgroundColor: bgColor,
  };

  return (
    <div className={styles.CTAButtonContainer}>
      <a href={action} className={styles.CTAButtonLink} onClick={onClick}>
        <button className={styles.CTAButton} style={buttonStyle}>
          {text && <p className={styles.text}>{text}</p>}
          {icon && <span className={styles.icon}>{icon}</span>}
        </button>
      </a>
    </div>
  );
};

export default Button;
