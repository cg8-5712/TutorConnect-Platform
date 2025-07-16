import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// 导入全局样式
import '@/assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

// 使用 Pinia 进行状态管理
app.use(pinia);

// 使用 Vue Router 进行路由管理
app.use(router);

// 挂载 Vue 应用程序到 #app
app.mount('#app');