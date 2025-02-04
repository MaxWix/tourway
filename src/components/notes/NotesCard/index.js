import React from "react";
import styles from "./styles.module.scss";
import CircleButton from "../../common/CircleButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faClock, faLocationDot, faEye } from "@fortawesome/free-regular-svg-icons";
import LocationIconOutline from "../../../assets/icons/location-outline.svg";
import { ReactComponent as EyeIcon } from "../../../assets/icons/view.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";


const NotesCard = ({ universityName, status, showButton = true, imageSrc, imageAlt = "University" }) => {
    return (
        <div className={styles.notesCard}>
            <div className={styles.notesCardHeader}>
                <div className={styles.universityHeader}>
                <div>
                    <img src={imageSrc} alt={universityName} />
                </div>
                <div>
                    <h3 className={styles.universityName}>{universityName}</h3>
                    <p className={styles.status}>{status}</p>
                </div>
                </div>
                {showButton && (
                    <div className={styles.arrowBtn}>
                        <CircleButton
                            icon={<FontAwesomeIcon icon={faArrowRightLong} />}
                            action="/"
                        />
                    </div>
                )}
            </div>
            <div className={styles.notesCardContent}>
                <div className={styles.timeStops}>
                    <div className={styles.time}>
                        <FontAwesomeIcon icon={faClock} />
                        <p><span>90</span> mins</p>
                    </div>
                    <div className={styles.stops}>
                        <img src={LocationIconOutline} />
                        <p><span>10</span> stops</p>
                    </div>
                </div>
                <div className={styles.cardActions}>
                <div>
                        <CircleButton
                            icon={<FontAwesomeIcon icon={faEye} />}
                            action="/"
                        />
                </div>
                <div>
                        <CircleButton
                            icon={<FontAwesomeIcon icon={faDownload} />}
                            action="/"
                        />
                </div>
                </div>

            </div>
        </div>
    );
};

export default NotesCard;