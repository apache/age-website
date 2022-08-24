import axios from 'axios';

async function getProjectListStateSetter(setProjectList, setPageInfo) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get('http://apacheage.shop:3999/api/v1/projects/list')
    .then((res) => {
      const result = { ...res.data };
      setProjectList(result.list);
      delete result.list;
      setPageInfo({ ...result });
      return true;
    })
    .catch(() => {
      console.error('error');
      return false;
    });
}

async function addProjectListStateSetter(
  projects,
  endCursor,
  setProjectList,
  setPageInfo
) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get(`http://apacheage.shop:3999/api/v1/projects/list?endCursor=${endCursor}`)
    .then((res) => {
      const result = { ...res.data };
      setProjectList([...projects, ...result.list]);
      delete result.list;
      setPageInfo({ ...result });
      return true;
    })
    .catch(() => {
      console.error('error');
      return false;
    });
}

async function getProjectDetailStateSetter(setProjects) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get('http://apacheage.shop:3999/api/v1/projects/detail')
    .then((res) => {
      setProjects(res.data);
      return true;
    })
    .catch(() => {
      console.error('error');
      return false;
    });
}

const manager = {
  getProjectListStateSetter,
  addProjectListStateSetter,
  getProjectDetailStateSetter,
};

export default manager;
