import axios from 'axios';

async function getRedditDataSetter(stateSetter) {
  axios.defaults.withCredentials = true;
  axios.defaults.headers['accept'] = 'application/json';
  return await axios
    .get('https://apacheage.shop:3999/api/v1/reddit/rss')
    .then((res) => {
      let item = res.data.list;
      for(let i = 0 ; i < item.length; i++) {
        item[i].content[0]['_'] = item[i].content[0]['_'].replaceAll("<a" , "<a target='_blank'")
        item[i].content[0]['_'] = item[i].content[0]['_'].replaceAll('href="/r/' , 'href="https://www.reddit.com/r/')
      }
      stateSetter(item);
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
