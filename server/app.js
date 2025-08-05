import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import authMiddleware from './middlewares/authMiddleware.js';

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

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

// 受保护的路由（使用 authMiddleware）
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: '这是一个受保护的路由',
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
  try {
  
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
      console.log(`📚 API 文档: http://localhost:${PORT}/api/docs`);
      
      console.log(`🌿 运行环境: ${process.env.NODE_ENV || 'development'}`);
    });
    
    const gracefulShutdown = () => {
      console.log('\n正在关闭服务器...');
      
      server.close(async () => {
        console.log('🔌 HTTP 服务器已关闭');
        
        await mongoose.connection.close();
        console.log('📦 MongoDB 连接已关闭');
        
        process.exit(0);
      });
      
      setTimeout(() => {
        console.error('⏱️ 强制关闭超时，强制退出进程');
        process.exit(1);
      }, 5000);
    };
    
    process.on('SIGINT', gracefulShutdown);  // Ctrl+C
    process.on('SIGTERM', gracefulShutdown); // 容器关闭信号
    
  } catch (error) {
    console.error('❌ 服务器启动失败:', error.message);
    process.exit(1);
  }
};

startServer();