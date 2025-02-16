import React from "react";
import styles from './styles.module.scss';

const Resources = ({ icon, text }) => {
    return (
        <div className={styles.resourcesCard}>
            <div className={styles.resourcesIcon}>{icon}</div>
            <p>{text}</p>
        </div>
    );
};

export default Resources;
