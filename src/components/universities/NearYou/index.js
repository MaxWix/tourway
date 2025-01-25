import React from "react";
import styles from './styles.module.scss';

import UniversityCard from "../UniversityCard";
import { Link } from "react-router-dom";

import DrexelCardIMG from '../../../assets/imgs/drexel-card.jpg';
import UPennCardIMG from '../../../assets/imgs/upenn-card.jpg';
import SJUCardIMG from '../../../assets/imgs/sju-card.jpg';


function NearYou() {
    return (
        <div>
            <h2>Near You</h2>
            <div className={styles.nearYou}> 
                <UniversityCard 
                    universityName="Drexel University" 
                    milesAway="0.5 mi away" 
                    universityIMG={DrexelCardIMG} 
                    universityLink="/university/1"
                />
                
                <UniversityCard  
                    universityName="University of Pennsylvania" 
                    milesAway="0.7 mi away" 
                    universityIMG={UPennCardIMG}
                />
        
                <UniversityCard  
                    universityName="Saint Joseph’s University" 
                    milesAway="1.5 mi away" 
                    universityIMG={SJUCardIMG}
                />
            </div>
        </div>
    );
};

export default NearYou;
