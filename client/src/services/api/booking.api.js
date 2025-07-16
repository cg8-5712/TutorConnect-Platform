import http from '@/services/utils/http';

const BookingService = {
  // 创建预约
  async createBooking(bookingData) {
    return http.post('/bookings', bookingData);
  },
  
  // 获取用户预约列表
  async getUserBookings(userId, params = {}) {
    return http.get(`/users/${userId}/bookings`, params);
  },
  
  // 获取教师预约列表
  async getTeacherBookings(teacherId, params = {}) {
    return http.get(`/teachers/${teacherId}/bookings`, params);
  },
  
  // 获取单个预约详情
  async getBookingById(bookingId) {
    return http.get(`/bookings/${bookingId}`);
  },
  
  // 更新预约状态
  async updateBookingStatus(bookingId, status) {
    return http.patch(`/bookings/${bookingId}/status`, { status });
  },
  
  // 取消预约
  async cancelBooking(bookingId) {
    return http.delete(`/bookings/${bookingId}`);
  },
  
  // 确认预约完成
  async completeBooking(bookingId, reviewData = {}) {
    return http.post(`/bookings/${bookingId}/complete`, reviewData);
  },
  
  // 处理支付
  async processPayment(bookingId, paymentData) {
    return http.post(`/bookings/${bookingId}/payment`, paymentData);
  }
};

export default BookingService;