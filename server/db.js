import mongoose from 'mongoose';

// 连接到 MongoDB 数据库
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI 环境变量未定义");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// 监听连接事件
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

export { connectDB };