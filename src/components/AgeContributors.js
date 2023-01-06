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

    const [viewerLastRestTPC, setViewerLastRestTPC] = useState([]);
    const [ageLastRestTPC, setAgeLastRestTPC] = useState([]);
    const [viewerThisRestTPC, setViewerThisRestTPC] = useState([]);
    const [ageThisRestTPC, setAgeThisRestTPC] = useState([]);

    const [isAgeLE, setIsAgeLE] = useState(false);
    const [isAgeE, setIsAgeE] = useState(false);
    const [isViewerLE, setIsViewerLE] = useState(false);
    const [isViewerE, setIsViewerE] = useState(false);
    
    useEffect(() => {
        issueManager.getIssuesStateSetter(setViewerIssueInfo,'age-viewer','open').then((res) => {
            if (res) {
                issueManager.getIssuesStateSetter(setViewerClosedIsInfo,'age-viewer','closed').then((res) => {
                    if (res) {
                        issueManager.getIssuesStateSetter(setAgeIssueInfo,'age','open').then((res) => {
                            if (res) {
                                issueManager.getIssuesStateSetter(setAgeClosedIssueInfo,'age','closed').then((res) => {
                                    if (res) {
                                        pullRequestManager.getPullRequestStateSetter(setViewerPullRequestInfo,'age-viewer','open').then((res) => {
                                            if (res) {
                                                pullRequestManager.getPullRequestStateSetter(setAgePullRequestInfo,'age','open').then((res) => {
                                                    if (res) {
                                                        pullRequestManager.getPullRequestStateSetter(setViewerClosedPRInfo,'age-viewer','closed').then((res) => {
                                                            if (res) {
                                                                pullRequestManager.getPullRequestStateSetter(setAgeClosedPRInfo,'age','closed').then((res) => {
                                                                    if (res) setLoadingYn(false);
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
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

        const sortPoints = (pts) => {
            const sortedPoints = Object.keys(pts).sort(function(x,y) {
                return pts[y] - pts[x]
            })
            return sortedPoints
        }

        if (!isLoading) {
            getPoints(viewerPullRequestInfo,100,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerClosedPRInfo,100,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerIssueInfo,50,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            getPoints(viewerClosedIsInfo,50,viewerPts,viewerAvt,viewerLWPT,viewerLWAV);
            const ViewerThisTotalPoints = sortPoints(viewerPts)
            const ViewerLastTotalPoints = sortPoints(viewerLWPT)
            if (ViewerThisTotalPoints.length < 5) {
                const len = ViewerThisTotalPoints.length
                for(let i=0; i < 5 - len; i++) 
                ViewerThisTotalPoints.push(null)
            }
            if (ViewerLastTotalPoints.length < 1) {
                ViewerLastTotalPoints.push(null);
            }
            setViewerTopContributors(ViewerThisTotalPoints.slice(0,5));
            setViewerAvatar(viewerAvt);
            setViewerLastTC(ViewerLastTotalPoints.slice(0,1));
            setViewerLastTCAV(viewerLWAV);

            if (ViewerLastTotalPoints.length > 1) {
                setViewerLastRestTPC(ViewerLastTotalPoints.slice(1,ViewerLastTotalPoints.length))
            }
            if (ViewerThisTotalPoints.length > 5) {
                setViewerThisRestTPC(ViewerThisTotalPoints.slice(5,ViewerThisTotalPoints.length))
            }
            getPoints(agePullRequestInfo,100,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageClosedPRInfo,100,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageIssueInfo,50,agePts,ageAvt,ageLWPT,ageLWAV);
            getPoints(ageClosedIssueInfo,50,agePts,ageAvt,ageLWPT,ageLWAV);
            const AgeThisTotalPoints = sortPoints(agePts)
            const AgeLastTotalPoints = sortPoints(ageLWPT)
            if (AgeThisTotalPoints.length < 5) {
                const len = AgeThisTotalPoints.length
                for(let i=0; i < 5 - len; i++) 
                AgeThisTotalPoints.push(null)
            }
            if (AgeLastTotalPoints.length < 1) {
                AgeLastTotalPoints.push(null);
            }
            setAgeTopContributors(AgeThisTotalPoints.slice(0,5));
            setAgeAvatar(ageAvt);
            setAgeLastTC(AgeLastTotalPoints.slice(0,1));
            setAgeLastTCAV(ageLWAV);

            if (AgeLastTotalPoints.length > 1) {
                setAgeLastRestTPC(AgeLastTotalPoints.slice(1,AgeLastTotalPoints.length))
            }
            if (AgeThisTotalPoints.length > 5) {
                setAgeThisRestTPC(AgeThisTotalPoints.slice(5,AgeThisTotalPoints.length))
            }
        }

    }, [isLoading])

    return (
        <>
            {isLoading ? (
                <p style={{ textAlign: 'center' }}>
                    <Spin></Spin>
                </p>
            ) : (
                <>
                    <div className={styles.root}>
                        <div>
                            <div className={styles.Repo}>
                                <h3>AGE</h3>
                            </div>
                            <div className={styles.Contributors}>
                                <WeekContext text={"Previous Week's Top Contributor"} last={true} status={isAgeLE} setStatus={setIsAgeLE} len={ageLastRestTPC.length}/>
                                {ageLastTC.length > 0 && ageLastTC.map((user,index) => (
                                    <ContributorsList index={index} user={user} avatar={ageLastTCAV[user]?.avatar} html={ageLastTCAV[user]?.html} last={true} icon={true}/>
                                ))}
                                {isAgeLE && ageLastRestTPC.map((user,index) => (
                                    <ContributorsList index={index+1} user={user} avatar={ageLastTCAV[user]?.avatar} html={ageLastTCAV[user]?.html} last={true} icon={false}/>
                                ))}
                                <WeekContext text={"Current Week"} last={false} status={isAgeE} setStatus={setIsAgeE} len={ageThisRestTPC.length}/>
                                {ageTopContributors.length > 1 && ageTopContributors?.map((user,index) => (
                                    <ContributorsList index={index} user={user} avatar={ageAvatar[user]?.avatar} html={ageAvatar[user]?.html} last={false} icon={false}/>
                                ))}
                                {isAgeE && ageThisRestTPC.map((user,index) => (
                                    <ContributorsList index={index+1} user={user} avatar={ageAvatar[user]?.avatar} html={ageAvatar[user]?.html} last={true} icon={false}/>
                                ))}
                            </div>  
                        </div>
                        <div className={styles.Separator}></div>
                        <div>
                            <div className={styles.Repo}>
                                <h3>AGE Viewer</h3>
                            </div>
                            <div className={styles.Contributors}>
                                <WeekContext text={"Previous Week's Top Contributor"} last={true} status={isViewerLE} setStatus={setIsViewerLE} len={viewerLastRestTPC.length}/>
                                {viewerLastTC.length > 0 && viewerLastTC.map((user,index) => (
                                    <ContributorsList index={index} user={user} avatar={viewerLastTCAV[user]?.avatar} html={viewerLastTCAV[user]?.html} last={true} icon={true} />
                                ))}
                                {isViewerLE && viewerLastRestTPC.map((user,index) => (
                                    <ContributorsList index={index+1} user={user} avatar={viewerLastTCAV[user]?.avatar} html={viewerLastTCAV[user]?.html} last={true} icon={false}/>
                                ))}
                                <WeekContext text={"Current Week"} last={false} status={isViewerE} setStatus={setIsViewerE} len={viewerThisRestTPC.length}/>
                                {viewerTopContributors.length > 1 && viewerTopContributors?.map((user,index) => (
                                    <ContributorsList index={index} user={user} avatar={viewerAvatar[user]?.avatar} html={viewerAvatar[user]?.html} last={false} icon={false} />
                                ))}
                                {isViewerE && viewerThisRestTPC.map((user,index) => (
                                    <ContributorsList index={index+1} user={user} avatar={viewerAvatar[user]?.avatar} html={viewerAvatar[user]?.html} last={true} icon={false}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}


export default Contributors;