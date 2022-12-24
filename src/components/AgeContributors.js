import React, { useEffect, useState } from 'react';
import issueManager from '../api/issueStateManager';
import pullRequestManager from '../api/pullRequestStateManager'
import * as styles from './styles/AgeContributors.module.scss';
import { Spin } from 'antd';
import ContributorsList from './ContributorsList';
import WeekContext from './WeekContext';

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

    const [viewerLastTCAV, setViewerLastTCAV] = useState({});
    const [ageLastTCAV, setAgeLastTCAV] = useState({});
    const [viewerLastTC, setViewerLastTC] = useState({});
    const [ageLastTC, setAgeLastTC] = useState({});
    const [isLoading, setLoadingYn] = useState(true);

    useEffect(() => {
        issueManager.getIssuesStateSetter(setViewerIssueInfo,'age-viewer','open').then((res) => {
            if (res) {
                issueManager.getIssuesStateSetter(setViewerClosedIsInfo,'age-viewer','closed').then((res) => {})
            }
        })
        issueManager.getIssuesStateSetter(setAgeIssueInfo,'age','open').then((res) => {
            if (res) {
                issueManager.getIssuesStateSetter(setAgeClosedIssueInfo,'age','closed').then((res) => {})
            }
        })
        pullRequestManager.getPullRequestStateSetter(setViewerPullRequestInfo,'age-viewer','open').then((res) => {
            if (res) {
                pullRequestManager.getPullRequestStateSetter(setAgePullRequestInfo,'age','open').then((res) => {})
            }
        })
        pullRequestManager.getPullRequestStateSetter(setViewerClosedPRInfo,'age-viewer','closed').then((res) => {
            if (res) {
                pullRequestManager.getPullRequestStateSetter(setAgeClosedPRInfo,'age','closed').then((res) => {})
            }
        })

    }, []);

    useEffect(() => {
        const viewerPts = {}
        const viewerAvt = {}
        const viewerLWPT = {}
        const viewerLWAV = {}

        const agePts = {}
        const ageAvt = {}
        const ageLWPT = {}
        const ageLWAV = {}

        const getPoints = (infos,point,ctrs,avts,lwctrs,lwavts) => {
            infos.forEach((info) => {
                if(!info.isLast) {
                    if (!ctrs[info.login]) {
                        ctrs[info.login] = 0
                        avts[info.login] = {avatar: info.avatar, html: info.html};
                    }
                    ctrs[info.login] += point;
                }
                if(info.isLast) {
                    if (!lwctrs[info.login]) {
                        lwctrs[info.login] = 0
                        lwavts[info.login] = {avatar: info.avatar, html: info.html};
                    }
                    lwctrs[info.login] += point;
                }
            })
        }

        if(viewerIssueInfo.length > 1 || viewerPullRequestInfo.length > 1 || viewerClosedPRInfo.length > 1 || viewerClosedIsInfo.length > 1) {
            getPoints(viewerPullRequestInfo,100,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerClosedPRInfo,100,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerIssueInfo,50,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerClosedIsInfo,50,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            const thisTotalPoints = Object.keys(viewerPts).sort(function(x,y) {
                return viewerPts[y] - viewerPts[x];
            })
            const lastTotalPoints = Object.keys(viewerLWPT).sort(function(x,y) {
                return viewerLWPT[y] - viewerLWPT[x];
            })
            if (thisTotalPoints.length < 5) {
                const tempV = [null,null,null,null,null];
                tempV.forEach((i) => thisTotalPoints.push(i));
            }
            if (lastTotalPoints.length < 1) {
                lastTotalPoints.push(null);
            }
            setViewerTopContributors(thisTotalPoints.slice(0,5));
            setViewerAvatar(viewerAvt);
            setViewerLastTC(lastTotalPoints.slice(0,1));
            setViewerLastTCAV(viewerLWAV);
        }

        if(ageIssueInfo.length > 1 || agePullRequestInfo.length > 1 || ageClosedPRInfo.length > 1 || ageClosedIssueInfo.length > 1) {
            getPoints(agePullRequestInfo,100,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageClosedPRInfo,100,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageIssueInfo,50,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageClosedIssueInfo,50,agePts,ageAvt,ageLWPT,ageLWAV);
            const totalPoints = Object.keys(agePts).sort(function(x,y) {
                return agePts[y] - agePts[x];
            })
            const lastTotalPoints = Object.keys(ageLWPT).sort(function(x,y) {
                return ageLWPT[y] - ageLWPT[x];
            })
            if (totalPoints.length < 5) {
                const tempV = [null,null,null,null,null]
                tempV.forEach((i) => totalPoints.push(i))
            }
            if (lastTotalPoints.length < 1) {
                lastTotalPoints.push(null);
            }
            setAgeTopContributors(totalPoints.slice(0,5));
            setAgeAvatar(ageAvt);
            setAgeLastTC(lastTotalPoints.slice(0,1));
            setAgeLastTCAV(ageLWAV);
        }

        if(viewerTopContributors.length > 1 && ageTopContributors.length > 1) setLoadingYn(false);

    }, [viewerClosedIsInfo,ageClosedIssueInfo,agePullRequestInfo,ageClosedPRInfo])

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
                            <WeekContext text={"Previous Week's Top Contributor"} last={true}/>
                            {ageLastTC?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={ageLastTCAV[user]?.avatar} html={ageLastTCAV[user]?.html} last={true} />
                            ))}
                            <WeekContext text={"Current Week"} last={false}/>
                            {ageTopContributors.length > 1 && ageTopContributors?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={ageAvatar[user]?.avatar} html={ageAvatar[user]?.html} last={false} />
                            ))}
                        </div>  
                        <div className={styles.Separator}></div>
                        <div className={styles.Contributors}>
                            <WeekContext text={"Previous Week's Top Contributor"} last={true}/>
                            {viewerLastTC?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={viewerLastTCAV[user]?.avatar} html={viewerLastTCAV[user]?.html} last={true} />
                            ))}
                            <WeekContext text={"Current Week"} last={false}/>
                            {viewerTopContributors.length > 1 && viewerTopContributors?.map((user,index) => (
                                <ContributorsList index={index} user={user} avatar={viewerAvatar[user]?.avatar} html={viewerAvatar[user]?.html} last={false} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Contributors;