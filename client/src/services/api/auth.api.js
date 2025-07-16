import http from '@/services/utils/http';

const AuthService = {
  // 用户登录
  async login(credentials) {
    return http.post('/auth/login', credentials);
  },
  
  // 用户注册
  async register(userData) {
    return http.post('/auth/register', userData);
  },
  
  // 获取当前用户信息
  async getCurrentUser() {
    return http.get('/auth/me');
  },
  
  // 刷新访问令牌
  async refreshToken(refreshToken) {
    return http.post('/auth/refresh', { refreshToken });
  },
  
  // 用户登出
  async logout() {
    return http.post('/auth/logout');
  },
  
  // 请求密码重置
  async requestPasswordReset(email) {
    return http.post('/auth/forgot-password', { email });
  },
  
  // 重置密码
  async resetPassword(token, newPassword) {
    return http.post('/auth/reset-password', { token, newPassword });
  },
  
  // 更新用户信息
  async updateUserProfile(userId, profileData) {
    return http.patch(`/users/${userId}`, profileData);
  },
  
  // 上传用户头像
  async uploadAvatar(userId, file) {
    return http.upload(`/users/${userId}/avatar`, file);
  }
};

export default AuthService;