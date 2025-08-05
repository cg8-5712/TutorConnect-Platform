const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next(); // 如果角色匹配，执行下一个中间件或路由处理程序
    };
};

export default roleMiddleware;