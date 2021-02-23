import { createApp } from 'vue'
import App from './App.vue'
import http from './plugins/http';
import './index.css'
import '../node_modules/spectre.css/dist/spectre.css';

const app = createApp(App);
app.use(http);
app.mount('#app');