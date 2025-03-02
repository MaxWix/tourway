// DirectionArrow.js
import React from 'react';
import styles from './styles.module.scss';
import Arrow from "../../../assets/icons/arrowupright.svg";

const DirectionArrow = ({ instruction }) => {
  // Function to determine the angle based on direction text
  const getDirectionAngle = (text) => {
    // Convert text to lowercase for easier matching
    const directionText = text.toLowerCase();
    
    // Define direction angles (in degrees, where 0 is North, 90 is East, etc.)
    if (directionText.includes('north') && directionText.includes('east')) return 45;
    if (directionText.includes('north') && directionText.includes('west')) return 315;
    if (directionText.includes('south') && directionText.includes('east')) return 135;
    if (directionText.includes('south') && directionText.includes('west')) return 225;
    if (directionText.includes('north')) return 0;
    if (directionText.includes('east')) return 90;
    if (directionText.includes('south')) return 180;
    if (directionText.includes('west')) return 270;
    
    // Default: no clear direction
    return null;
  };

  // Extract the first word or two from instructions to get direction
  const extractDirection = (html) => {
    // Remove HTML tags
    const plainText = html.replace(/<[^>]*>/g, '');
    // Get the first few words (usually contains direction)
    const words = plainText.split(' ').slice(0, 3).join(' ');
    return words;
  };

  const directionText = extractDirection(instruction);
  const angle = getDirectionAngle(directionText);
  
  // If no direction found, don't show arrow
  if (angle === null) return null;
  
  return (
    <div className={styles.directionContainer}>
      <div 
        className={styles.Arrow}
        style={{ 
          transform: `rotate(${angle}deg)`,
   
        }}
      >
        <img 
          src={Arrow} 
          alt="Direction Arrow" 
        />
      </div>
      
      {/* <div className={styles.directionText}>
        <p>{directionText}</p>
      </div> */}
    </div>
  );
};

export default DirectionArrow;