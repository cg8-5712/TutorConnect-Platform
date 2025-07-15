import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { setupGuards } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则恢复到该位置
    if (savedPosition) {
      return savedPosition;
    }
    // 如果路由有hash，滚动到对应元素
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // 默认滚动到顶部
    return { top: 0, behavior: 'smooth' };
  }
});

// 设置路由守卫
setupGuards(router);

export default router;