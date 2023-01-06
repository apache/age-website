const getDates = (isLast) => {
  let dates = [];
  const currentDate = new Date();

  for(let i=0; i<7; i++) {
    const lastWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (i - (currentDate.getDay() - 1)) - isLast);
    const year = lastWeek.getFullYear();
    const month = Number(lastWeek.getMonth()) + 1;
    const day = lastWeek.getDate();

    month = String(month).length === 1 ? '0' + month : month;
    day = String(day).length === 1 ? '0' + day : day;
    dates.push(year + '-' + month + '-' + day);
  }
  return dates;
}

async function getPullRequestStateSetter(setPullRequestInfo,repo,state) {
    const response =  await fetch(`https://api.github.com/repos/apache/${repo}/pulls?state=${state}&per_page=1000`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();
      const status = state === 'open' ? 'created_at' : 'merged_at'  
      let requestors = [];
      let lastWeeks = getDates(7);
      let thisWeeks = getDates(0);
      res.map((info) => {
        if (info[status] && lastWeeks.includes(info[status].split('T')[0])) {
          requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url, isLast: true});
         } else if (info[status] && thisWeeks.includes(info[status].split('T')[0])) {
          requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url, isLast: false});
         }
      });

      setPullRequestInfo(requestors);
      return true;
      
    }
}
const manager = {
    getPullRequestStateSetter,
};

export default manager;
