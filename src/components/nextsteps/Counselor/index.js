import React from "react";
import styles from './styles.module.scss';
import CircleButton from "../../common/CircleButton";
import Button from "../../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import AdmissionCounselor from "../../../assets/imgs/admission-counselor.jpg";

const Counselor = () => {
    return (
    <div className={styles.counselorCard}>
      <h5>Admission Counselor</h5>
      <div className={styles.counselorContent}>
        <img src={AdmissionCounselor}/>
        <div className={styles.counselorInformation}>
          <h6>Michael Anderson</h6>
          <p>Tel: +1 (123) 456-7890</p>
          <p>Email: ma132@drexel.edu</p>
        </div>
        <CircleButton
            bgColor="#d0e4f6"
            iconColor="#07294d"
            icon={<FontAwesomeIcon icon={faEnvelope} />}
            action="#"
        />
      </div>
      </div>
    );
  };

  export default Counselor;