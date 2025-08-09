const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // 执行下一个中间件或路由处理程序
};

export default loggerMiddleware;