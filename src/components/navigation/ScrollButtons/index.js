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
  const [combinedHeaders, setCombinedHeaders] = useState([]);
  
  // Check for Related Majors header and add it as the second item
  useEffect(() => {
    const allH3Elements = Array.from(document.querySelectorAll('h3'));
    const relatedMajorsH3 = allH3Elements.find(h3 => 
      h3.textContent.trim().toLowerCase() === 'related majors'
    );
    
    // If we found the Related Majors header, insert it as the second item
    if (relatedMajorsH3) {
      const updatedHeaders = [...headers];
      const relatedMajorsText = "Related Majors";
      
      // Insert as second item (index 1) if there are at least 2 items
      // Otherwise just add it to the end
      if (updatedHeaders.length >= 1) {
        updatedHeaders.splice(1, 0, relatedMajorsText);
      } else {
        updatedHeaders.push(relatedMajorsText);
      }
      
      setCombinedHeaders(updatedHeaders);
    } else {
      setCombinedHeaders(headers);
    }
  }, [headers]);

  // Scroll handler using useCallback
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
        header: currentH3.textContent.trim(),
        top: sectionTop + topBuffer,
        bottom: sectionBottom + bottomBuffer,
      });
    }

    // Find which section we're currently in
    let newActiveHeader = null;
    for (let i = 0; i < combinedHeaders.length; i++) {
      // Find matching section for this header
      const matchingSection = sections.find(section => 
        section.header.toLowerCase() === combinedHeaders[i].toLowerCase()
      );
      
      if (matchingSection && 
          scrollPosition >= matchingSection.top && 
          scrollPosition < matchingSection.bottom) {
        newActiveHeader = i;
        break;
      }
    }

    // Only update state if the active header changed
    if (newActiveHeader !== activeHeader) {
      setActiveHeader(newActiveHeader);
    }
  }, [activeHeader, topBuffer, bottomBuffer, combinedHeaders]);

  const handleHeaderClick = (index) => {
    const headerText = combinedHeaders[index];
    const h3Elements = Array.from(document.querySelectorAll('h3'));
    
    // Find the h3 element that matches this header text
    const targetH3 = h3Elements.find(h3 => 
      h3.textContent.trim().toLowerCase() === headerText.toLowerCase()
    );
    
    if (targetH3) {
      const elementPosition = targetH3.offsetTop - scrollOffset;

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
      {combinedHeaders.map((header, index) => (
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