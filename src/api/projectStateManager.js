import axios from 'axios';

async function getProjectListStateSetter(setProjectList, setPageInfo, repoNm) {
//console.log("projectStateManager repoNm : ");
//console.log(repoNm);  
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get(`https://apacheage.shop:3999/api/v1/projects/list?repoNm=${repoNm}`)
    //.get(`https://localhost:3999/api/v1/projects/list?repoNm=${repoNm}`)
    .then((res) => {
//console.log("projectStateManager result")
//console.log(res.data)           
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
  setPageInfo,
  repoNm
) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios

    .get(`https://apacheage.shop:3999/api/v1/projects/list?endCursor=${endCursor}&repoNm=${repoNm}`)
    //.get(`https://localhost:3999/api/v1/projects/list?endCursor=${endCursor}&repoNm=${repoNm}`)
    .then((res) => {
      const result = { ...res.data };
//console.log("projectStateManager result")
//console.log("res.data")      
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
    .get(`https://apacheage.shop:3999/api/v1/projects/detail`)
    //.get('https://localhost:3999/api/v1/projects/detail')
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
