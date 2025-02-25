import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import '../../../styles/styles.global.scss';

const ScrollButtons = ({ headers }) => {
  const [activeHeader, setActiveHeader] = useState(null);

  // More efficient scroll handler using useCallback
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const h4Elements = Array.from(document.querySelectorAll('h4'));

    const headerPositions = h4Elements.map((h4Element) => {
      // Get the parent <div> of the <h4>
      const parentDiv = h4Element.parentElement;
      const parentTop = parentDiv.offsetTop; // Top position of the parent <div>
      const parentHeight = parentDiv.offsetHeight; // Height of the parent <div>

      return {
        top: parentTop - 200, // Offset for better trigger point
        bottom: parentTop + parentHeight, // Bottom position of the parent <div>
      };
    });

    // Find the current active section
    const currentSection = headerPositions.findIndex(
      ({ top, bottom }) => scrollPosition >= top && scrollPosition < bottom
    );

    setActiveHeader(currentSection === -1 ? null : currentSection);
  }, []);

  const handleHeaderClick = (index) => {
    const h4Elements = document.querySelectorAll('h4');
    if (h4Elements[index]) {
      const offset = -10; // Adjust this value based on your header height
      const elementPosition = h4Elements[index].offsetTop + offset;

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
          className={`${activeHeader === index ? 'active' : ''}`}
        >
          {header}
        </button>
      ))}
    </div>
  );
};

export default ScrollButtons;