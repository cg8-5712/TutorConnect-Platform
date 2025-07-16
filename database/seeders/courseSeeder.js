const mongoose = require('mongoose');
const Course = require('../models/Course'); // 引入 Course 模型
const dotenv = require('dotenv');

dotenv.config();

const courses = [
  {
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming using Python.',
    tutor: 'john_doe', // 假设用户存在
    price: 100
  },
  {
    title: 'Advanced Mathematics',
    description: 'In-depth study of calculus and linear algebra.',
    tutor: 'jane_smith', // 假设用户存在
    price: 150
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // 清空现有课程数据
    await Course.deleteMany({});
    console.log('Existing courses deleted.');

    // 插入新课程数据
    await Course.insertMany(courses);
    console.log('Courses seeded successfully.');

    // 关闭连接
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding courses:', error);
    mongoose.connection.close();
  }
};

seedCourses();