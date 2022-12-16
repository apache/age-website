
async function getViewerPullRequestStateSetter(setPullRequestInfo) {
    const response =  await fetch('https://api.github.com/repos/apache/age-viewer/pulls?state=open',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();   
      const requestors = [];
      const currentDate = new Date();
      res.map((info) => {
        const createdDate = new Date(info.created_at);
        const diffDate = currentDate.getTime() - createdDate.getTime();
        if(Math.abs(diffDate / (1000*60*60*24)) < 8) requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
      });

      setPullRequestInfo(requestors);
      return true;
      
    }
}

async function getAgePullRequestStateSetter(setPullRequestInfo) {
    const response =  await fetch('https://api.github.com/repos/apache/age/pulls?state=open',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();   
      const requestors = [];
      const currentDate = new Date();
      res.map((info) => {
        const createdDate = new Date(info.created_at);
        const diffDate = currentDate.getTime() - createdDate.getTime();
        if(Math.abs(diffDate / (1000*60*60*24)) < 8) requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
      });

      setPullRequestInfo(requestors);
      return true;
      
    }
}

async function getViewerClosedPullRequestStateSetter(setPullRequestInfo) {
    const response =  await fetch('https://api.github.com/repos/apache/age-viewer/pulls?state=closed',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();   
      const requestors = [];
      const currentDate = new Date();
      res.map((info) => {
        const closedDate = new Date(info.closed_at);
        const diffDate = currentDate.getTime() - closedDate.getTime();
        if(info.merged_at && Math.abs(diffDate / (1000*60*60*24)) < 8) requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
      });
      setPullRequestInfo(requestors);
      return true;
    }
}

async function getAgeClosedPullRequestStateSetter(setPullRequestInfo) {
    const response =  await fetch('https://api.github.com/repos/apache/age/pulls?state=closed',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();   
      const requestors = [];
      const currentDate = new Date();
      res.map((info) => {
        const closedDate = new Date(info.closed_at);
        const diffDate = currentDate.getTime() - closedDate.getTime();
        if(info.merged_at && Math.abs(diffDate / (1000*60*60*24)) < 8) requestors.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
      });
      setPullRequestInfo(requestors);
      return true;
    }
}

const manager = {
    getViewerPullRequestStateSetter,
    getAgePullRequestStateSetter,
    getViewerClosedPullRequestStateSetter,
    getAgeClosedPullRequestStateSetter,
};

export default manager;
