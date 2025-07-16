/**
 * 验证电子邮件格式
 * @param {string} email - 电子邮件地址
 * @returns {boolean} 是否有效
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {Object} 验证结果
 */
export function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isValid = password.length >= minLength && 
                  hasUpperCase && 
                  hasLowerCase && 
                  hasNumber && 
                  hasSpecialChar;
  
  return {
    isValid,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  };
}

/**
 * 验证手机号码
 * @param {string} phone - 手机号码
 * @returns {boolean} 是否有效
 */
export function validatePhone(phone) {
  const re = /^1[3-9]\d{9}$/;
  return re.test(phone);
}

/**
 * 验证日期是否在未来
 * @param {Date} date - 日期
 * @returns {boolean} 是否在未来
 */
export function isFutureDate(date) {
  const now = new Date();
  return new Date(date) > now;
}

/**
 * 验证预约时间
 * @param {Date} startTime - 开始时间
 * @param {Date} endTime - 结束时间
 * @returns {boolean} 是否有效
 */
export function validateBookingTime(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  // 结束时间必须在开始时间之后
  if (end <= start) return false;
  
  // 预约时长至少30分钟
  const duration = (end - start) / (1000 * 60); // 分钟
  return duration >= 30;
}

/**
 * 验证教师资料
 * @param {Object} profile - 教师资料
 * @returns {Object} 验证结果
 */
export function validateTeacherProfile(profile) {
  const errors = {};
  
  if (!profile.name || profile.name.trim().length < 2) {
    errors.name = '姓名至少需要2个字符';
  }
  
  if (!profile.subject || profile.subject.trim().length === 0) {
    errors.subject = '请选择教学科目';
  }
  
  if (!profile.bio || profile.bio.trim().length < 50) {
    errors.bio = '个人简介至少需要50个字符';
  }
  
  if (!profile.hourlyRate || profile.hourlyRate < 50) {
    errors.hourlyRate = '课时费不能低于50元/小时';
  }
  
  if (!profile.experience || profile.experience < 0) {
    errors.experience = '教学经验不能为负数';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}