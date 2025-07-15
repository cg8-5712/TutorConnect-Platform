import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';

// 路由守卫设置函数
export function setupGuards(router) {
  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();
    
    // 设置页面标题
    document.title = to.meta.title || 'TutorConnect - 家教平台';
    
    // 检查用户认证状态
    const isAuthenticated = authStore.isAuthenticated;
    
    // 如果用户已认证但访问登录/注册页面，重定向到首页
    if (isAuthenticated && to.meta.hideForAuth) {
      notificationStore.showInfo('您已登录，将跳转到首页');
      return next({ name: 'home' });
    }
    
    // 如果需要认证但用户未登录
    if (to.meta.requiresAuth && !isAuthenticated) {
      notificationStore.showWarning('请先登录以访问此页面');
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
    
    // 对于需要加载数据的路由
    if (to.meta.dataLoader) {
      try {
        await to.meta.dataLoader(to);
      } catch (error) {
        console.error('路由数据加载失败:', error);
        notificationStore.showError('加载页面数据失败');
        return next({ name: 'not-found' });
      }
    }
    
    next();
  });

  // 全局解析守卫
  router.beforeResolve(async to => {
    // 可以在这里添加页面加载状态管理
  });

  // 全局后置钩子
  router.afterEach((to, from) => {
    // 可以在这里添加页面访问统计
    // 例如：analytics.trackPageView(to.fullPath);
  });

  // 路由错误处理
  router.onError(error => {
    console.error('路由错误:', error);
    const notificationStore = useNotificationStore();
    notificationStore.showError('导航到页面时发生错误');
  });
}