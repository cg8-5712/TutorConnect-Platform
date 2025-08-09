import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from "./src/config/config.js";

// 加载环境变量
dotenv.config();

// 连接到 MongoDB 数据库
const connectDB = async () => {
  try {
    const dbURI = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`;
    console.log(`🔗 Connecting to MongoDB: ${dbURI}`);
    const options = {
      useNewUrlParser: true,       // 使用新的 URL 解析器
      useUnifiedTopology: true,    // 使用新的服务器发现和监视引擎
    };

    const conn = await mongoose.connect(dbURI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 设置事件监听
    setupConnectionEvents();

  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};


// 设置数据库连接事件监听
const setupConnectionEvents = () => {
  mongoose.connection.on('connected', () => {
    console.log('📚 MongoDB 连接成功');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB 连接错误: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB 连接断开');
  });

  // 关闭连接时的处理
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB 连接已关闭');
    process.exit(0);
  });
};

// 默认导出 connectDB 函数
export default connectDB;