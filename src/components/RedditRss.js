import React, { useState, useEffect, useCallback } from 'react';
import redditManager from '../api/redditStateManager';
import { HTMLContent } from '../components/Content';
import * as styles from './styles/RedditRss.module.scss';
import './styles/RedditRss.scss';
import { Spin } from 'antd';

const RedditRss = () => {
  const [isLoading, setLoaindgYn] = useState(true);

  const loadReddit = () => {
    setLoaindgYn(true);
    redditManager.getRedditDataSetter(setRedditRss)
    .then((res) => setLoaindgYn(!res));

  }
  const [redditRss, setRedditRss] = useState([]);

  useEffect(() => {
    loadReddit();
  }, []);

  const htmlParser = (string) => {
    string = String(string).replaceAll('&lt;', '<');
    string = String(string).replaceAll('&gt;', '>');
    return string;
  };

  const RssItem = (props) => {
    return (
      <div className={styles.Item}>
        <p className={styles.Title}>{props.title}</p>
        <HTMLContent
          className={styles.Contents}
          content={htmlParser(props.content ?? '')}
        />
        <p className={styles.Date}>{new Date(props.updated).toDateString()}</p>
      </div>
    );
  };

  const RssItems = useCallback(() => {
    return redditRss?.map((item) => (
      <RssItem
        title={item?.title[0]}
        content={item.content[0]['_']}
        updated={item.updated[0]}
      />
    ))


  }, [redditRss]);

  return (
    <div className={styles.root}>
      <div className={styles.Header}></div>
      <div className={styles.Container}>
        {isLoading ? (
            <p style={{ margin:'1rem'}}>
              <Spin></Spin>
            </p>
          ) : (
            <RssItems />
        )}
        <div className={styles.joinButtonContainer}>
          <button className={styles.joinButton}  onClick={() =>
            (window.location.href =
              'https://www.reddit.com/r/apacheage/')
            }>Join the Forum</button>
        </div>
      </div>
      <div className={styles.Footer}>
        <div>

          {isLoading ? (
            <p style={{ margin:'1rem'}}>
              <Spin></Spin>
            </p>
          ) : (
            <a onClick={loadReddit}>
              Refresh
            </a>
          )}
        </div>
        <a target="_blank" href="https://www.reddit.com/r/apacheage/">
          View on r/apacheage
        </a>
      </div>
    </div>
  );
};

export default RedditRss;
