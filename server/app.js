const authMiddleware = require('./middlewares/authMiddleware');
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 数据库连接
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB 连接成功');
  } catch (error) {
    console.error(`❌ MongoDB 连接失败: ${error.message}`);
    process.exit(1);
  }
};

// 中间件
app.use(cors()); // 启用 CORS
app.use(express.json()); // 内置的 JSON 解析中间件

// 简单的用户路由示例（实际应放在单独文件）
const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => {
  // 实际注册逻辑
  res.json({ message: '注册成功', user: req.body });
});

userRoutes.post('/login', (req, res) => {
  // 实际登录逻辑
  res.json({ message: '登录成功', token: 'sample_token' });
});

// 路由设置
app.use('/api/users', userRoutes);

// 受保护的路由示例
app.use('/api/protected', (req, res, next) => {
  // 简化的认证中间件
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: '未授权' });
  next();
}, (req, res) => {
  res.json({ message: '受保护的路由', user: { id: 123, name: '测试用户' } });
});

// API 文档路由
app.get('/api/docs', (_req, res) => {
  res.json({
    message: 'API 文档',
    endpoints: {
      '/api/users/register': 'POST - 用户注册',
      '/api/users/login': 'POST - 用户登录',
      '/api/protected': 'GET - 受保护的路由'
    }
  });
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// 错误处理中间件
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器错误' });
});

// 启动服务器
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📚 API 文档: http://localhost:${PORT}/api/docs`);
  });
};

startServer();