import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Header = ({ 
    HeaderIMG, 
    headerTitle, 
    headerSubtitle, 
    showBackButton, 
    showHeartButton, 
    onHeartClick, 
    isHearted 
}) => {
    const navigate = useNavigate(); 

    return (
        <div 
            className={styles.header}
            style={{ backgroundImage: `url(${HeaderIMG})` }}
        > 
            <div>
                {showBackButton && (
                    <button 
                        className={styles.backButton} 
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </button>
                )}
            </div>
            <div className={styles.headerBottom}> 
                <div className={styles.headerText}> 
                    <h1>{headerTitle}</h1>
                    <p>{headerSubtitle}</p>
                </div>
                <div className={styles.heartButtonContainer}> 
                    {showHeartButton && (
                        <button 
                            className={`${styles.heartButton} ${isHearted ? styles.hearted : ''}`} 
                            onClick={onHeartClick}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
