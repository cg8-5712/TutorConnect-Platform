import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// 生成 JWT
export const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // 1小时有效期
  );
};

// 验证 JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // token 无效
  }
};