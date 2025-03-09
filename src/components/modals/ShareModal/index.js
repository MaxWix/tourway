import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../../common/CircleButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ShareModal = ({ closeShareModal }) => {
  return (
    <div className={styles.shareModalOverlay}>
      <div className={styles.shareModalCon}>
        <CircleButton
          icon={<FontAwesomeIcon icon={faXmark} />}
          bgColor="#D0E4F6"
          iconColor="#07294D"
          onClick={closeShareModal}
        />
        <p>Share Modal</p>
      </div>
    </div>
  );
};

export default ShareModal;
