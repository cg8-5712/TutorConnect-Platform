import dotenv from 'dotenv';

// 加载 .env 文件中的环境变量
dotenv.config();

const config = {
    app: {
        port: process.env.SREVER_PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        name: process.env.DB_NAME || 'mydatabase',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
    },
};

export default config;