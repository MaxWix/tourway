import React from "react";
import styles from './styles.module.scss';

const UniversityList = ({ universities }) => {
    return (
      <div>
        <h2>All Universities</h2>
        {universities.map((university, index) => (
          <div className={styles.universityList} key={index}> {}
            <a href="#">
            <img
              src={university.logo} 
              alt={university.name} 
            />
            <h3>{university.name}</h3>
            </a>
          </div>
        ))}
      </div>
    );
  };




export default UniversityList;