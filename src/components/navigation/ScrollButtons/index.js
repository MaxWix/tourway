import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import '../../../styles/styles.global.scss';

const ScrollButtons = ({ 
  headers, 
  scrollOffset = 130, 
  topBuffer = 40, 
  bottomBuffer = 40 
}) => {
  const [activeHeader, setActiveHeader] = useState(null);

  // More efficient scroll handler using useCallback
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const h3Elements = Array.from(document.querySelectorAll('h3'));
    
    // Early return if no h3 elements found
    if (h3Elements.length === 0) return;

    // Find the section boundaries based on h3 elements
    const sections = [];
    
    for (let i = 0; i < h3Elements.length; i++) {
      const currentH3 = h3Elements[i];
      const nextH3 = h3Elements[i + 1] || null;
      
      // Get all elements between current h3 and next h3
      let currentElement = currentH3;
      let sectionElements = [currentH3];
      
      while (currentElement.nextElementSibling && 
             (!nextH3 || !currentElement.nextElementSibling.isSameNode(nextH3))) {
        currentElement = currentElement.nextElementSibling;
        sectionElements.push(currentElement);
      }
      
      // Calculate section boundaries
      const sectionTop = currentH3.offsetTop;
      
      // For the last section, use the bottom of the last element as boundary
      const lastElement = sectionElements[sectionElements.length - 1];
      const sectionBottom = nextH3 ? nextH3.offsetTop : lastElement.offsetTop + lastElement.offsetHeight;
      
      sections.push({
        top: sectionTop + topBuffer, // Use topBuffer prop
        bottom: sectionBottom + bottomBuffer, // Use bottomBuffer prop
      });
    }

    // Find which section we're currently in
    let newActiveHeader = null;
    for (let i = 0; i < sections.length; i++) {
      if (scrollPosition >= sections[i].top && scrollPosition < sections[i].bottom) {
        newActiveHeader = i;
        break;
      }
    }

    // Only update state if the active header changed
    if (newActiveHeader !== activeHeader) {
      setActiveHeader(newActiveHeader);
    }
  }, [activeHeader, topBuffer, bottomBuffer]);

  const handleHeaderClick = (index) => {
    const h3Elements = document.querySelectorAll('h3');
    if (h3Elements[index]) {
      const elementPosition = h3Elements[index].offsetTop - scrollOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Add throttled scroll listener
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  return (
    <div className={styles.scrollButtonsHolder}>
      {headers.map((header, index) => (
        <button
          key={index}
          onClick={() => handleHeaderClick(index)}
          className={`${activeHeader === index ? styles.active : ''}`}
        >
          {header}
        </button>
      ))}
    </div>
  );
};

export default ScrollButtons;