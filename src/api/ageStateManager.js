import axios from 'axios';

async function getAgeInfoSetter(stateSetter) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get('https://apacheage.shop:3999/api/v1/github/star-and-member?owner=apache&repo=age', {
      owner: 'apache',
      repos: 'age',
    })
    .then((res) => {
      stateSetter(res.data);
      return true;
    })
    .catch(() => {
      console.error('error');
      return false;
    });
}

const manager = {
  getAgeInfoSetter,
};

export default manager;
