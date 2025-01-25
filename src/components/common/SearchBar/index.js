import React from "react";
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
    return (
    <div className={styles.searchBar}> 
        <input type="text" placeholder="Search colleges"></input>
        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} /> 
    </div>

  );
    };

export default SearchBar;