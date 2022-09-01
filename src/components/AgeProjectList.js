import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import projectManager from '../api/projectStateManager';
import * as styles from './styles/ProjectList.module.scss';
// component
import ProjectDetail from './ProjectDetail';
import { Spin } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const ProjectList = ({ mode }) => {
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setLoaindgYn] = useState(true);
  const [isAddLoading, setAddLoaindgYn] = useState(false);

  useEffect(() => {
    projectManager
      .getProjectListStateSetter(setProjects, setPageInfo, 'age')
      .then((res) => setLoaindgYn(!res));
  }, []);

  const moreProject = useCallback(() => {
    setAddLoaindgYn(true);
    projectManager
      .addProjectListStateSetter(
        projects,
        pageInfo.endCursor,
        setProjects,
        setPageInfo
        , 'age'
      )
      .then((res) => setAddLoaindgYn(!res));
  }, [pageInfo, projects]);

  return (
    <>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </p>
      ) : (
        <PerfectScrollbar>
          <ul className={styles.cardRoot}>
            {projects?.map((item) => (
              <li key={item.project.id}>
                <ProjectDetail project={item.project} mode="card" />
              </li>
            ))}
          </ul>
        </PerfectScrollbar>
      )}
      {isAddLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </p>
      ) : (
        <></>
      )}
      <ul className={styles.buttonGroup}>
        <p style={{ textAlign: 'center' }}>
          {(() => {
//console.log('AgeProjectList pageInfo')             
//console.log(pageInfo.totalCount)            
            if (pageInfo?.hasNextPage && projects.length < 12)
              return (
                <button
                  className={styles.MoreBtn}
                  onClick={() => moreProject()}
                >
                  More
                </button>
              );
            else if (projects.length == 12 || !pageInfo?.hasNextPage)
              return (
                <button
                  className={styles.MoreBtn}
                  onClick={() =>
                  (window.open("about:blank").location.href = 
                    'https://github.com/apache/age/projects')
                  }
                >
                  View on GitHub
                </button>
              );
            else return <></>;
          })()}
        </p>
       
      </ul>
    </>
  );
};

ProjectList.propTypes = {
  mode: PropTypes.string,
};

export default ProjectList;
