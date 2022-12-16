
async function getViewerIssuesStateSetter(setIssueInfo) {
    const response =  await fetch('https://api.github.com/repos/apache/age-viewer/issues?state=open',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) 
    if(response.ok) {
      const res = await response.json();   
      const issuers = [];
      const currentDate = new Date();
      res.map((info) => {
         const createdDate = new Date(info.created_at);
         const diffDate = currentDate.getTime() - createdDate.getTime();
         if(info.html_url.includes("issues") && Math.abs(diffDate / (1000*60*60*24)) < 8) {
            issuers.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
         }
      })
      setIssueInfo(issuers);
      return true;
      
    }
  }
  
  async function getAgeIssuesStateSetter(setIssueInfo) {
      const response =  await fetch('https://api.github.com/repos/apache/age/issues?state=open',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }) 
      if(response.ok) {
        const res = await response.json();   
        const issuers = [];
        const currentDate = new Date();
        res.map((info) => {
           const createdDate = new Date(info.created_at);
           const diffDate = currentDate.getTime() - createdDate.getTime();
           if(info.html_url.includes("issues") && Math.abs(diffDate / (1000*60*60*24)) < 8) {
              issuers.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
           }
        })
        setIssueInfo(issuers);
        return true;
        
      }
  }
  
  async function getVieweClosedrIssuesStateSetter(setIssueInfo) {
      const response =  await fetch('https://api.github.com/repos/apache/age-viewer/issues?state=closed',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }) 
      if(response.ok) {
        const res = await response.json();   
        const issuers = [];
        const currentDate = new Date();
        res.map((info) => {
          const closedDate = new Date(info.closed_at);
          const diffDate = currentDate.getTime() - closedDate.getTime();
           if(info.html_url.includes("issues") && Math.abs(diffDate / (1000*60*60*24)) < 8) {
              issuers.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
           }
        })
        setIssueInfo(issuers);
        return true;
        
      }
  }
  
  async function getAgeClosedIssuesStateSetter(setIssueInfo) {
      const response =  await fetch('https://api.github.com/repos/apache/age/issues?state=closed',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }) 
      if(response.ok) {
        const res = await response.json();   
        const issuers = [];
        const currentDate = new Date();
        res.map((info) => {
          const closedDate = new Date(info.closed_at);
          const diffDate = currentDate.getTime() - closedDate.getTime();
           if(info.html_url.includes("issues") && Math.abs(diffDate / (1000*60*60*24)) < 8) {
              issuers.push({login:info.user.login, avatar: info.user.avatar_url, html: info.user.html_url});
           }
        })
        setIssueInfo(issuers);
        return true;
        
      }
  }
  
  
    
  const manager = {
      getViewerIssuesStateSetter,
      getAgeIssuesStateSetter,
      getVieweClosedrIssuesStateSetter,
      getAgeClosedIssuesStateSetter,
  };
  
  export default manager;
  