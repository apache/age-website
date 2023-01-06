import React from 'react';
import * as styles from './styles/AgeContributors.module.scss';
import medalImage from '../../static/img/medal.jpg'

const ContributorsList = ({ index, user, avatar, html, last, icon }) => {
    return (
        <div className={styles.Users}>
            <div className={styles.Rank}>
                {icon ? user && last ? <img src={medalImage}></img> : <></> : <p>{index+1}</p> }
                <a href={html} style={avatar ? {visibility: "visible"} : {visibility: "hidden"}}><img className={styles.Avatar} src={avatar}></img></a>
            </div>
            <div className={styles.User}>
                <p>{user}</p>
            </div>
        </div>
    )
}


export default ContributorsList;