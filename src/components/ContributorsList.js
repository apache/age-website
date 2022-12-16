import React from 'react';
import * as styles from './styles/AgeContributors.module.scss';

const ContributorsList = ({ index, user, avatar, html }) => {
    return (
        <div className={styles.Users}>
            <div className={styles.Rank}>
                <p>{index+1}</p>
                <a href={html}><img className={styles.Avatar} src={avatar}></img></a>
            </div>
            <div className={styles.User}>
                <p>{user}</p>
            </div>
        </div>
    )
}


export default ContributorsList;