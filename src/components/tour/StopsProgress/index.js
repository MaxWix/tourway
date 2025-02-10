import React from 'react';
import styles from "./styles.module.scss";

const StopsProgress = ({ stops }) => {
  return (
    <div className={styles.stopsProgress}>
      <p>
        <span>{stops}</span> stops
      </p>
    </div>
  );
};

export default StopsProgress;
