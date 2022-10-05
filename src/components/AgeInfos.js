import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ageStateManager from '../api/ageStateManager';
import * as styles from './styles/Ageinfos.module.scss';
import { Spin } from 'antd';

const Ageinfos = () => {
  const [ageInfo, setAgeInfo] = useState({});
  const [ageViewerInfo, setAgeViewerInfo] = useState({});
  const [isLoading, setLoaindgYn] = useState(true);
  useEffect(() => {
    ageStateManager.getAgeInfoSetter(setAgeInfo).then((res) => {
      if (res) {
        ageStateManager.getAgeViewerInfoSetter(setAgeViewerInfo).then((res) => {
          if (res) {
            setLoaindgYn(false);
          }
        });
      }
    });
  }, []);
  return (
    <div className={styles.root}>
      <div  className={styles.Stars}>
        <p>Github Star</p>
        <div className={styles.Section}>
          {isLoading ? <Spin /> : <></>}
          <div>
            <a
              target="_blank"
              href="https://github.com/apache/age/stargazers"
              className={styles.Count}
            >
              {ageInfo.startCount}
            </a>
            <span className={styles.Label}>AGE</span>
          </div>
          <div>
            <a
              target="_blank"
              href="https://github.com/apache/age-viewer/stargazers"
              className={styles.Count}
            >
              {ageViewerInfo.startCount}
            </a>
            <span className={styles.Label}>AGE Viewer</span>
          </div>
        </div>
      </div>

      <div className={styles.Separator}></div>

      <div  className={styles.Contributors}>
        <p>Contributors</p>
        <div className={styles.Section}>
          {isLoading ? <Spin /> : <></>}
          <div>
            <a href="https://github.com/apache/age/contributors" className={styles.Count}>
              {ageInfo.memberCount}
            </a>
            <span className={styles.Label}>AGE</span>
          </div>
          <div>
            <a href="https://github.com/apache/age-viewer/contributors" className={styles.Count}>
              {ageViewerInfo.memberCount}
            </a>
            <span className={styles.Label}>AGE Viewer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Ageinfos.propTypes = {
  title: PropTypes.string,
};

export default Ageinfos;
