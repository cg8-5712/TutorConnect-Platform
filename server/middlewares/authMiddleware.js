const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // 从请求头获取 token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        // 验证 token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 获取用户信息
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // 将用户信息附加到请求对象
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        res.status(500).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;

module.exports = authMiddleware;