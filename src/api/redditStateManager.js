import axios from 'axios';

async function getRedditDataSetter(stateSetter) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get('https://apacheage.shop:3999/api/v1/reddit/rss')
    .then((res) => {
      stateSetter(res.data.list);
      return true;
    })
    .catch(() => {
      console.error('error');
      return false;
    });
}

const manager = {
  getRedditDataSetter,
};

export default manager;
