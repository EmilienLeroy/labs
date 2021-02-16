export default {
  install(app) {
    const http = fetchAbsolute(fetch, import.meta.env.VITE_API_URL);
    app.config.globalProperties.$http = http;
    app.provide('http', http);
  }
}

function fetchAbsolute(fetch, baseUrl) {
  return (url, method = 'GET', body = {}, ...otherParams) => {
    const params = {
      ...otherParams,
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    
    if (method === 'POST' || method === 'PUT') {
      params.body = JSON.stringify(body);
    }

    return url.startsWith('/') ? 
      fetch(baseUrl + url, params) : 
      fetch(url, ...params); 
  }
}