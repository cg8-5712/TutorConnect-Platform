const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes'); // 引入用户路由
const bodyParser = require('./middlewares/bodyParser');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const cors = require('cors'); // 引入 CORS

const app = express();

// 连接到数据库
connectDB();

// 启用 CORS
app.use(cors());

// 使用中间件
app.use(express.json()); // 解析 JSON 请求
app.use(loggerMiddleware);
app.use(bodyParser);

// 路由设置
app.use('/api', userRoutes); // 使用用户路由
app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// 文档路由（可选）
app.get('/api/docs', (req, res) => {
    res.json({
        message: 'API Documentation',
        routes: {
            '/api/users': 'GET - 获取用户列表',
            '/api/users/:id': 'GET - 获取单个用户',
            '/api/users': 'POST - 创建用户',
            '/api/users/:id': 'PUT - 更新用户',
            '/api/users/:id': 'DELETE - 删除用户',
            '/api/register': 'POST - 用户注册',
            '/api/login': 'POST - 用户登录'
        }
    });
});

// 错误处理中间件
app.use(errorMiddleware);

// 启动服务器
const PORT = config.app.port || process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${config.app.env} mode on port ${PORT}`);
});