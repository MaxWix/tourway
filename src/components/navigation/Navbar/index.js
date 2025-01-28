import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import styles from './styles.module.scss';

import HomeIconOutline from '../../../assets/icons/home-outline.svg';
import HomeIconFilled from '../../../assets/icons/home-filled.svg';
import NotesIconOutline from '../../../assets/icons/notes-outline.svg';
import NotesIconFilled from '../../../assets/icons/notes-filled.svg';
import ProfileIconOutline from '../../../assets/icons/profile-outline.svg';
import ProfileIconFilled from '../../../assets/icons/profile-filled.svg';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.navItem}>
        <img 
          src={location.pathname === '/' ? HomeIconFilled : HomeIconOutline} 
          alt="Home" 
        />
        <span className={location.pathname === '/' ? styles.active : ''}>Home</span>
      </Link>
      <Link to="/notes" className={styles.navItem}>
        <img 
          src={location.pathname === '/notes' ? NotesIconFilled : NotesIconOutline} 
          alt="Notes" 
        />
        <span className={location.pathname === '/notes' ? styles.active : ''}>Notes</span>
      </Link>
      <Link to="/profile" className={styles.navItem}>
        <img 
          src={location.pathname === '/profile' ? ProfileIconFilled : ProfileIconOutline} 
          alt="Profile" 
        />
        <span className={location.pathname === '/profile' ? styles.active : ''}>Profile</span>
      </Link>
    </div>
  );
};

export default Navbar;
