import React from 'react';
import styles from './styles.module.scss';

const CircleButton = ({
  icon = <span>Icon</span>, // Default icon or content
  height = '2.5rem',
  width = '2.5rem',
  bgColor = '#0BA3A8',
  iconColor = '#ffffff',
  action = '#',
  onClick, 
}) => {
  const buttonStyle = {
    height: height,
    width: width,
    backgroundColor: bgColor,
    color: iconColor,
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (action === '#') {
      e.preventDefault(); 
    }
  };

  return (
    <a href={action} className={styles.circleButtonLink} onClick={onClick}>
      <button className={styles.circleButton} style={buttonStyle}>
        {icon}
      </button>
    </a>
  );
};

export default CircleButton;