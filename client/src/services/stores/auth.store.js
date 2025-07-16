import { defineStore } from 'pinia';
import AuthService from '@/services/api/auth.api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isLoading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || 'student'
  },
  
  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await AuthService.login(credentials);
        this.token = response.accessToken;
        this.refreshToken = response.refreshToken;
        this.user = response.user;
        
        // 保存token到localStorage
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        // 重定向到首页或之前的目标页面
        const redirect = router.currentRoute.value.query.redirect || '/';
        router.push(redirect);
        
        return true;
      } catch (error) {
        this.error = error.message || '登录失败，请检查您的凭证';
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    
    async register(userData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await AuthService.register(userData);
        this.token = response.accessToken;
        this.refreshToken = response.refreshToken;
        this.user = response.user;
        
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        router.push('/');
        return true;
      } catch (error) {
        this.error = error.message || '注册失败，请稍后重试';
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchCurrentUser() {
      if (!this.token) return;
      
      this.isLoading = true;
      try {
        const user = await AuthService.getCurrentUser();
        this.user = user;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        // 如果token无效，执行登出
        if (error.code === 401) {
          this.logout();
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    async refreshAccessToken() {
      if (!this.refreshToken) return false;
      
      try {
        const response = await AuthService.refreshToken(this.refreshToken);
        this.token = response.accessToken;
        localStorage.setItem('authToken', response.accessToken);
        return true;
      } catch (error) {
        console.error('刷新令牌失败:', error);
        this.logout();
        return false;
      }
    },
    
    async logout() {
      try {
        if (this.token) {
          await AuthService.logout();
        }
      } catch (error) {
        console.error('登出失败:', error);
      } finally {
        // 清除状态和本地存储
        this.token = null;
        this.refreshToken = null;
        this.user = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        
        // 重定向到登录页
        router.push({ name: 'login' });
      }
    },
    
    async updateProfile(profileData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const updatedUser = await AuthService.updateUserProfile(this.user.id, profileData);
        this.user = { ...this.user, ...updatedUser };
        return true;
      } catch (error) {
        this.error = error.message || '更新个人资料失败';
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    
    async uploadAvatar(file) {
      if (!this.user) return;
      
      try {
        const avatarUrl = await AuthService.uploadAvatar(this.user.id, file);
        this.user.avatar = avatarUrl;
        return avatarUrl;
      } catch (error) {
        console.error('上传头像失败:', error);
        throw error;
      }
    }
  }
});