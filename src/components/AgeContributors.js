import React, { useEffect, useState } from 'react';
import issueManager from '../api/issueStateManager';
import pullRequestManager from '../api/pullRequestStateManager'
import * as styles from './styles/AgeContributors.module.scss';
import { Spin } from 'antd';
import ContributorsList from './ContributorsList';

const Contributors = () => {
    const [ageIssueInfo, setAgeIssueInfo] = useState([]);
    const [viewerIssueInfo, setViewerIssueInfo] = useState([]);
    const [ageClosedIssueInfo, setAgeClosedIssueInfo] = useState([]);
    const [viewerClosedIsInfo, setViewerClosedIsInfo] = useState([]);

    const [agePullRequestInfo, setAgePullRequestInfo] = useState([]);
    const [viewerPullRequestInfo, setViewerPullRequestInfo] = useState([]);
    const [viewerClosedPRInfo, setViewerClosedPRInfo] = useState([]);
    const [ageClosedPRInfo, setAgeClosedPRInfo] = useState([]);

    const [viewerAvatar, setViewerAvatar] = useState({});
    const [ageAvatar, setAgeAvatar] = useState({});
    const [viewerTopContributors, setViewerTopContributors] = useState({});
    const [ageTopContributors, setAgeTopContributors] = useState([]);

    const [isLoading, setLoadingYn] = useState(true);

    useEffect(() => {
        issueManager.getViewerIssuesStateSetter(setViewerIssueInfo).then((res) => {
            if (res) {
                issueManager.getVieweClosedrIssuesStateSetter(setViewerClosedIsInfo).then((res) => {})
            }
        })
        issueManager.getAgeIssuesStateSetter(setAgeIssueInfo).then((res) => {
            if (res) {
                issueManager.getAgeClosedIssuesStateSetter(setAgeClosedIssueInfo).then((res) => {})
            }
        })
        pullRequestManager.getViewerPullRequestStateSetter(setViewerPullRequestInfo).then((res) => {
            if (res) {
                pullRequestManager.getAgePullRequestStateSetter(setAgePullRequestInfo).then((res) => {})
            }
        })
        pullRequestManager.getViewerClosedPullRequestStateSetter(setViewerClosedPRInfo).then((res) => {
            if (res) {
                pullRequestManager.getAgeClosedPullRequestStateSetter(setAgeClosedPRInfo).then((res) => {})
            }
        })

    }, []);

    useEffect(() => {
        if(viewerIssueInfo.length > 1 || viewerPullRequestInfo.length > 1 || viewerClosedPRInfo.length > 1) {
            const points = {}
            const avatars = {}
            viewerPullRequestInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 100;
            })
            viewerClosedPRInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 100;
            })
            viewerIssueInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 50;
            })
            viewerClosedIsInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 50;
            })
            const totalPoints = Object.keys(points).sort(function(x,y) {
                return points[y] - points[x];
            })
            if (totalPoints.length < 5) {
                const tempV = [null,null,null,null,null]
                tempV.forEach((i) => totalPoints.push(i))
            }
            setViewerTopContributors(totalPoints.slice(0,5));
            setViewerAvatar(avatars);
        }

        if(ageIssueInfo.length > 1 || agePullRequestInfo.length > 1 || ageClosedPRInfo.length > 1) {
            const points = {}
            const avatars = {}
            agePullRequestInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 100;
            })
            ageClosedPRInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 100;
            })
            ageIssueInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 50;
            })
            ageClosedIssueInfo.forEach((info) => {
                if(!points[info.login]) {
                    points[info.login] = 0
                    avatars[info.login] = {avatar: info.avatar, html: info.html};
                }
                points[info.login] += 50;
            })
            const totalPoints = Object.keys(points).sort(function(x,y) {
                return points[y] - points[x];
            })
            if (totalPoints.length < 5) {
                const tempV = [null,null,null,null,null]
                tempV.forEach((i) => totalPoints.push(i))
            }
            setAgeTopContributors(totalPoints.slice(0,5));
            setAgeAvatar(avatars);
        }

        if(viewerTopContributors.length > 1 || ageTopContributors.length > 1) setLoadingYn(false);

    }, [viewerPullRequestInfo,agePullRequestInfo,ageClosedPRInfo])

    return (
        <>
            {isLoading ? (
                <p style={{ textAlign: 'center' }}>
                    <Spin></Spin>
                </p>
            ) : (
                <>
                    <div className={styles.Repos}>
                        <h3>AGE</h3>
                        <div className={styles.ReposSeparator}></div>
                        <h3>AGE Viewer</h3>
                    </div>
                    <div className={styles.root}>
                        <div className={styles.Contributors}>
                            {ageTopContributors.length > 1 && ageTopContributors?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={ageAvatar[user]?.avatar} html={ageAvatar[user]?.html} />
                            ))}
                        </div>  
                        <div className={styles.Separator}></div>
                        <div className={styles.Contributors}>
                            {viewerTopContributors.length > 1 && viewerTopContributors?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={viewerAvatar[user]?.avatar} html={viewerAvatar[user]?.html} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Contributors;