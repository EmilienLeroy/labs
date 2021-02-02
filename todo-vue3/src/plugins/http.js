export default {
  install(app) {
    const http = fetchAbsolute(fetch)('http://localhost:8083');
    app.config.globalProperties.$http = http;
  }
}

function fetchAbsolute(fetch) {
  return baseUrl => (url, ...otherParams) => url.startsWith('/') ? fetch(baseUrl + url, ...otherParams) : fetch(url, ...otherParams)
}