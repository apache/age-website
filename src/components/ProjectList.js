import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import projectManager from '../api/projectStateManager';
import * as styles from './styles/ProjectList.module.scss';
// component
import ProjectDetail from './ProjectDetail';
import { Spin } from 'antd';

const ProjectList = ({ mode }) => {
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setLoaindgYn] = useState(true);
  const [isAddLoading, setAddLoaindgYn] = useState(false);

  useEffect(() => {
    projectManager
      .getProjectListStateSetter(setProjects, setPageInfo)
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
        <ul className={styles.cardRoot}>
          
          {projects?.map((item) => (
            <li>
              <ProjectDetail project={item.project} mode="card" />
            </li>
          ))}
        </ul>
      )}
      {isAddLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </p>
      ) : (
        <></>
      )}
      <p style={{ textAlign: 'center' }}>
        {/* {pageInfo?.hasNextPage ? (
          <button className={styles.MoreBtn} onClick={() => moreProject()}>More</button>
        ) : (
          <></>
        )} */}
        {
          (() => {
            if (pageInfo?.hasNextPage && projects.length < 16) 
              return (<button className={styles.MoreBtn} onClick={() => moreProject()}>More</button>);
            else if (projects.length == 16) 
              return (<button className={styles.MoreBtn} onClick={() => window.location.href = "https://github.com/shinhanbyeol?tab=projects&type=new" }>Projects</button>);
            else 
              return (<></>);
          })()
        }

      </p>
    </>
  );
};

ProjectList.propTypes = {
  mode: PropTypes.string,
};

export default ProjectList;
