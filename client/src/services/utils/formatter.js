/**
 * 格式化价格
 * @param {number} price - 价格（分）
 * @returns {string} 格式化后的价格
 */
export function formatPrice(price) {
  // 转换为元
  const yuan = price / 100;
  return `¥${yuan.toFixed(2)}`;
}

/**
 * 格式化评分
 * @param {number} rating - 评分（0-5）
 * @returns {string} 格式化后的评分
 */
export function formatRating(rating) {
  return rating.toFixed(1);
}

/**
 * 格式化日期时间
 * @param {Date|string} date - 日期对象或字符串
 * @param {boolean} [includeTime=true] - 是否包含时间
 * @returns {string} 格式化后的日期时间
 */
export function formatDateTime(date, includeTime = true) {
  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return d.toLocaleString('zh-CN', options);
}

/**
 * 格式化持续时间
 * @param {number} minutes - 分钟数
 * @returns {string} 格式化后的持续时间
 */
export function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}小时`;
  }
  
  return `${hours}小时${remainingMinutes}分钟`;
}

/**
 * 格式化用户角色
 * @param {string} role - 角色标识
 * @returns {string} 角色名称
 */
export function formatUserRole(role) {
  const roles = {
    student: '学生',
    teacher: '教师',
    admin: '管理员'
  };
  
  return roles[role] || role;
}

/**
 * 截断文本
 * @param {string} text - 原始文本
 * @param {number} maxLength - 最大长度
 * @param {string} [ellipsis='...'] - 省略号
 * @returns {string} 截断后的文本
 */
export function truncateText(text, maxLength, ellipsis = '...') {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + ellipsis;
}

/**
 * 生成教师标签
 * @param {string[]} tags - 标签数组
 * @param {number} [max=3] - 最大显示数量
 * @returns {string} 标签字符串
 */
export function formatTeacherTags(tags, max = 3) {
  if (!tags || tags.length === 0) return '';
  
  const displayedTags = tags.slice(0, max);
  const moreCount = tags.length - max;
  
  let result = displayedTags.join(' · ');
  
  if (moreCount > 0) {
    result += ` +${moreCount}`;
  }
  
  return result;
}