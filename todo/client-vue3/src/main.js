import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import http from './plugins/http';

const app = createApp(App);
app.use(http);
app.mount('#app');