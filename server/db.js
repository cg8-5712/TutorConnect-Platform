import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 连接到 MongoDB 数据库
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI 环境变量未定义");
    }
    
    // 设置 Mongoose 选项
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // 设置事件监听
    setupConnectionEvents();
    
    return conn;
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