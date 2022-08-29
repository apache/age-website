import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ageStateManager from '../api/ageStateManager';
import * as styles from './styles/Ageinfos.module.scss';
import { Spin } from 'antd';

const Ageinfos = () => {
  const [ageInfo, setAgeInfo] = useState({});
  const [isLoading, setLoaindgYn] = useState(true);
  useEffect(() => {
    ageStateManager
      .getAgeInfoSetter(setAgeInfo)
      .then((res) => setLoaindgYn(!res));
  }, []);
  return (
    <div className={styles.root}>
      <div>
        {isLoading ? <Spin /> : <></>}
        <a target="_blank" href='https://github.com/apache/age/stargazers' className={styles.Count}>{ageInfo.startCount}</a>
        <br />
        <span className={styles.Label}>✭ Star</span>
      </div>
      <div></div>
      <div>
        {isLoading ? <Spin /> : <></>}
        <a href='/team' className={styles.Count}>{ageInfo.memberCount} +</a>
        <br />
        <span className={styles.Label}>Team Members</span>
      </div>
    </div>
  );
};

Ageinfos.propTypes = {
  title: PropTypes.string,
};

export default Ageinfos;
