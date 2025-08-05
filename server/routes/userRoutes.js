import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// 创建用户
router.post('/users', userController.createUser);

// 获取用户列表
router.get('/users', userController.getUsers);

// 获取单个用户
router.get('/users/:id', authMiddleware, userController.getUserById);

// 更新用户信息
router.put('/users/:id', authMiddleware, userController.updateUser);

// 删除用户
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), userController.deleteUser);

// 用户注册
router.post('/register', userController.register);

// 用户登录
router.post('/login', userController.login);

export default router;