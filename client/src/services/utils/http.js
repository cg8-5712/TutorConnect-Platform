import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// 创建自定义axios实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器 - 添加认证token
http.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器 - 统一错误处理
http.interceptors.response.use(response => {
  return response.data;
}, error => {
  // 处理HTTP错误
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // 未授权，可能需要重新登录
        console.error('未授权访问，请重新登录');
        break;
      case 403:
        console.error('权限不足，无法访问');
        break;
      case 404:
        console.error('请求的资源不存在');
        break;
      case 500:
        console.error('服务器内部错误');
        break;
      default:
        console.error(`请求错误: ${status}`);
    }
    
    return Promise.reject({
      code: status,
      message: data?.message || '请求失败',
      details: data?.errors || []
    });
  } else if (error.request) {
    // 请求已发出但无响应
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: '网络连接错误，请检查您的网络连接'
    });
  } else {
    // 请求配置错误
    return Promise.reject({
      code: 'REQUEST_ERROR',
      message: error.message
    });
  }
});

// 封装常用HTTP方法
export default {
  get(url, params = {}, config = {}) {
    return http.get(url, { params, ...config });
  },
  
  post(url, data = {}, config = {}) {
    return http.post(url, data, config);
  },
  
  put(url, data = {}, config = {}) {
    return http.put(url, data, config);
  },
  
  patch(url, data = {}, config = {}) {
    return http.patch(url, data, config);
  },
  
  delete(url, config = {}) {
    return http.delete(url, config);
  },
  
  // 文件上传方法
  upload(url, file, fieldName = 'file', config = {}) {
    const formData = new FormData();
    formData.append(fieldName, file);
    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    });
  }
};