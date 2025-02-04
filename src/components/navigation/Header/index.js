import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss';
import Swoop from "../../../assets/icons/swoop.svg";
import TourwaySwoop from "../../../assets/tourway/tourway-swoop.png";

const Header = ({
    HeaderIMG,
    headerTitle,
    headerSubtitle,
    height = "215px",  // Default height if no prop is passed
    showSwoop = true,  // Default to showing Swoop
    showTourwaySwoop = false,  // Default to not showing TourwaySwoop
    swoopTop = "143px",  // Default top position for Swoop
    tourwaySwoopTop = "56px",  // Default top position for TourwaySwoop
}) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.header}
            style={{ backgroundImage: `url(${HeaderIMG})`, height }}
        >
            {showSwoop && (
                <div className={styles.swoop} style={{ top: swoopTop }}>
                    <img src={Swoop} alt="Swoop" />
                </div>
            )}

            {showTourwaySwoop && (
                <div className={styles.tourwaySwoop} style={{ top: tourwaySwoopTop }}>
                    <img src={TourwaySwoop} alt="Tourway Swoop" />
                </div>
            )}
            <div className={styles.headerBottom}>
                <div className={styles.headerText}>
                    <h1>{headerTitle}</h1>
                    <p>{headerSubtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;