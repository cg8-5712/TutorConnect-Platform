// 用户角色
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

// 预约状态
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected'
};

// 支付方式
export const PAYMENT_METHODS = {
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  BANK: 'bank',
  PLATFORM: 'platform'
};

// 支付状态
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// 教师认证状态
export const TEACHER_VERIFICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// 科目分类
export const SUBJECT_CATEGORIES = {
  MATH: '数学',
  PHYSICS: '物理',
  CHEMISTRY: '化学',
  BIOLOGY: '生物',
  CHINESE: '语文',
  ENGLISH: '英语',
  HISTORY: '历史',
  GEOGRAPHY: '地理',
  POLITICS: '政治',
  OTHERS: '其他'
};

// 错误代码
export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500
};