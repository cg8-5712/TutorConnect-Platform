const mongoose = require('mongoose');
const User = require('../models/User'); // 引入 User 模型
const dotenv = require('dotenv');

dotenv.config();

const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123', // 请在实际中使用哈希密码
    role: 'student'
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password123', // 请在实际中使用哈希密码
    role: 'tutor'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // 清空现有用户数据
    await User.deleteMany({});
    console.log('Existing users deleted.');

    // 插入新用户数据
    await User.insertMany(users);
    console.log('Users seeded successfully.');

    // 关闭连接
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

seedUsers();