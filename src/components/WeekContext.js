import React from 'react';
import * as styles from './styles/AgeContributors.module.scss';

const WeekContext = ({ text, last }) => {
    return (
        <div className={styles.Weeks} style={last ? {color: '#483D8B'} : {color: '#B8145A'}}>
            <p>{text}</p>
        </div>
    )
}


export default WeekContext;