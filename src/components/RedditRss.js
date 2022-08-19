import React, { useState, useEffect, useCallback } from 'react';
import redditManager from '../api/redditStateManager';
import { HTMLContent } from '../components/Content';
import * as styles from './styles/RedditRss.module.scss';
import './styles/RedditRss.scss';

const RedditRss = () => {
  const [redditRss, setRedditRss] = useState([]);

  useEffect(() => {
    redditManager.getRedditDataSetter(setRedditRss);
  }, []);
  useEffect(() => {
    redditRss?.forEach((item) => {});
  }, [redditRss]);

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
    ));
  }, [redditRss]);

  return (
    <div className={styles.root}>
      <div className={styles.Header}></div>
      <div className={styles.Container}>
        <RssItems />
      </div>
      <div className={styles.Footer}>
        <a target="_blank" href="https://www.reddit.com/r/apacheage/">
          View on Forum
        </a>
      </div>
    </div>
  );
};

export default RedditRss;
