import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Swoop from "../../../assets/icons/swoop.svg";
import CircleButton from "../../common/CircleButton";
import TourwaySwoop from "../../../assets/tourway/tourway-swoop.png";

const Header = ({
    HeaderIMG,
    headerTitle,
    headerSubtitle,
    showBackButton,
    showHeartButton,
    onHeartClick,
    isHearted,
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

            <div className={styles.backButtonContainer}>
                {showBackButton && (
                    <CircleButton
                        icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                        bgColor="#DFF3F4"
                        iconColor="#0BA3A8"
                        onClick={() => navigate(-1)}
                    />
                )}
            </div>
            <div className={styles.headerBottom}>
                <div className={styles.headerText}>
                    <h1>{headerTitle}</h1>
                    <p>{headerSubtitle}</p>
                </div>
                <div className={styles.heartButtonContainer}>
                    {showHeartButton && (
                        <CircleButton
                            icon={<FontAwesomeIcon icon={faHeart} />}
                            bgColor="#DFF3F4"
                            iconColor="#0BA3A8"
                            onClick={onHeartClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;