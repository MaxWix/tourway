import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../../common/CircleButton";
import { faXmark, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import sendIcon from "../../../assets/icons/share-white.svg";
import QRCode from "../../../assets/imgs/QRCode.svg";
import linkIcon from "../../../assets/icons/link.svg";
import chatIcon from "../../../assets/icons/chat-na.svg";
import Button from "../../common/Button";

const ShareModal = ({
  closeShareModal,
  withBeginButton = false,
  handleStopClick,
}) => {
  return (
    <div className={styles.shareModalOverlay}>
      <div className={styles.shareModalCon}>
        <div className={styles.modalHeader}>
          <div>
            <img src={sendIcon} />
            <h2>Share Your Tour</h2>
          </div>
          <CircleButton
            icon={<FontAwesomeIcon icon={faXmark} />}
            bgColor="#D0E4F6"
            iconColor="#07294D"
            onClick={closeShareModal}
          />
        </div>
        <div className={styles.modalContent}>
          <h3>
            Share this tour with family or friends who are with
            you&nbsp;on&nbsp;campus
          </h3>
          <p>They can follow the same tour on their&nbsp;own&nbsp;device!</p>

          <div className={styles.imgBtnsCon}>
            <img src={QRCode} alt="example of QR" />
            <div>
              <div>
                <CircleButton
                  icon={<img src={linkIcon} alt="link" />}
                  bgColor="#D0E4F6"
                  iconColor="#07294D"
                />
                <p> Copy link</p>
              </div>
              <div>
                <CircleButton
                  icon={<img src={chatIcon} alt="link" />}
                  bgColor="#D0E4F6"
                  iconColor="#07294D"
                />
                <p>Messages</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnCenter}>
          {withBeginButton && (
            <Button
              text="BEGIN TOUR"
              icon={<FontAwesomeIcon icon={faArrowRightLong} />}
              bgColor="#07294d"
              borderColor="#07294d"
              onClick={handleStopClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
