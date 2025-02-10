import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.scss";

const CategoryTag = ({ label, defaultSelected, onClick, selectable }) => {
  const [isSelected, setIsSelected] = useState(defaultSelected);

  const handleClick = () => {
    if (selectable) {
      setIsSelected(!isSelected);
      onClick(!isSelected);
    }
  };

  return (
    <button
      className={`${styles.tag} ${isSelected ? styles.selected : styles.unselected}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

CategoryTag.propTypes = {
  label: PropTypes.string.isRequired,
  defaultSelected: PropTypes.bool,
  onClick: PropTypes.func,
  selectable: PropTypes.bool,
};

CategoryTag.defaultProps = {
  defaultSelected: false,
  onClick: () => {},
  selectable: true,
};

export default CategoryTag;
