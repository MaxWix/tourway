import React from "react";
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ placeholder }) {
    return (
        <div className={styles.SearchBar}>
            <input type="text" placeholder={placeholder} />
            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        </div>
    );
}

export default SearchBar;