const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // 在控制台输出错误堆栈

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorMiddleware;