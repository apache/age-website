import React from 'react';
import * as styles from './styles/AgeContributors.module.scss';

const ContributorsList = ({ index, user, avatar, html, last }) => {
    return (
        <div className={styles.Users} style={last ? {paddingBottom: "0"} : {paddingBottom: "1.5rem"}}>
            <div className={styles.Rank}>
                <p style={last ? {opacity: "0"} : {opacity: "1"}}>{index+1}</p>
                <a href={html} style={avatar ? {visibility: "visible"} : {visibility: "hidden"}}><img className={styles.Avatar} src={avatar}></img></a>
            </div>
            <div className={styles.User}>
                <p>{user}</p>
            </div>
        </div>
    )
}


export default ContributorsList;