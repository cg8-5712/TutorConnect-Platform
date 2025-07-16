import http from '@/services/utils/http';

const TeacherService = {
  // 获取教师列表
  async getTeachers(params = {}) {
    return http.get('/teachers', params);
  },
  
  // 获取单个教师详情
  async getTeacherById(teacherId) {
    return http.get(`/teachers/${teacherId}`);
  },
  
  // 搜索教师
  async searchTeachers(query, filters = {}) {
    return http.post('/teachers/search', { query, filters });
  },
  
  // 创建教师档案
  async createTeacherProfile(teacherData) {
    return http.post('/teachers', teacherData);
  },
  
  // 更新教师档案
  async updateTeacherProfile(teacherId, updateData) {
    return http.patch(`/teachers/${teacherId}`, updateData);
  },
  
  // 获取教师可用时间
  async getTeacherAvailability(teacherId) {
    return http.get(`/teachers/${teacherId}/availability`);
  },
  
  // 更新教师可用时间
  async updateTeacherAvailability(teacherId, availability) {
    return http.put(`/teachers/${teacherId}/availability`, availability);
  },
  
  // 获取教师评价
  async getTeacherReviews(teacherId, params = {}) {
    return http.get(`/teachers/${teacherId}/reviews`, params);
  },
  
  // 添加教师评价
  async addTeacherReview(teacherId, reviewData) {
    return http.post(`/teachers/${teacherId}/reviews`, reviewData);
  }
};

export default TeacherService;