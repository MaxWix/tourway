import React from "react";
import styles from './styles.module.scss';
// import DrexelLogo from "../assets/logos/drexel-logo.png";
import DrexelLogo from "../../../assets/logos/drexel-logo.png";

const CustomTourName = () => {
    return (
<div className={styles.LogoNameHolder}>
    <img src={DrexelLogo} alt="Drexel University Logo"/>
    <div>
        <h1>
            Drexel University
        </h1>
        <h2>
            Custom Campus Tour
        </h2>
    </div>
   
</div>
    );
};

export default CustomTourName;