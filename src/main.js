import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { initTheme } from './utils/theme'
import './assets/main.css'
import { createPinia } from 'pinia';

// 初始化主题
initTheme()

const app = createApp(App)


app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
