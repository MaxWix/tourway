import React from "react";
import styles from "./styles.module.scss";
import CircleButton from "../../common/CircleButton";
import Button from "../../common/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faClock, faLocationDot, faEye } from "@fortawesome/free-regular-svg-icons";
import LocationIconOutlineWhite from "../../../assets/icons/location-outline-white.svg";
// import { ReactComponent as EyeIcon } from "../../../assets/icons/view.svg";
// import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";
import NotesIcon from "../../../assets/icons/notes-outline.svg";
import downloadIcon from "../../../assets/icons/download-navy.svg";
import EyeIcon from "../../../assets/icons/view-navy.svg";

const SummaryNotesCard = () => {
    return (
        <div className={styles.summaryNotesCard}>
            <div className={styles.summaryNotesCardHeader}>
                <div className={styles.summaryNotesCardText}>
                    <img src={NotesIcon} alt="Notes Icon"/>
                    <p>Tour Notes</p>
                </div>
                <CircleButton 
                    bgColor="#d0e4f6"
                    iconColor="#07294d"
                    icon={<img src={downloadIcon} />}
                    action="#" />
            </div>
            <div className={styles.summaryNotesCardContent}>
                <div className={styles.timeStops}>
                    <div className={styles.stops}>
                        <img src={LocationIconOutlineWhite} />
                        <p><b>10</b> stops</p>
                    </div>
                    <div className={styles.time}>
                        <FontAwesomeIcon icon={faClock} />
                        <p><b>90</b> mins</p>
                    </div>
                </div>
                <div className={styles.summaryNotesCardActions}>
                    <button className={styles.summaryNotesCardButton}>
                        <p>VIEW NOTES</p>
                        <div className={styles.icon}>
                        <img src={EyeIcon} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryNotesCard;