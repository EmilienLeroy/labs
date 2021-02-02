export default {
  install(app) {
    const http = fetchAbsolute(fetch)(import.meta.env.VITE_API_URL);
    app.config.globalProperties.$http = http;
    app.provide('http', http);
  }
}

function fetchAbsolute(fetch) {
  return baseUrl => (url, ...otherParams) => url.startsWith('/') ? fetch(baseUrl + url, ...otherParams) : fetch(url, ...otherParams)
}