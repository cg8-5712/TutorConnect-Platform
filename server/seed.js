import dotenv from 'dotenv';
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); 
import { connectDB } from './db.js';
import mongoose from 'mongoose';
import User from './models/User.js';
import Teacher from './models/Teacher.js';
import Booking from './models/Booking.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // 清除现有数据
    await User.deleteMany();
    await Teacher.deleteMany();
    await Booking.deleteMany();
    
    // 创建学生用户
    const student = new User({
      email: 'student@example.com',
      passwordHash: 'hashed_password_123',
      fullName: '张三',
      role: 'student',
      phone: '13800138000'
    });
    await student.save();
    
    // 创建教师用户
    const teacherUser = new User({
      email: 'teacher@example.com',
      passwordHash: 'hashed_password_456',
      fullName: '李老师',
      role: 'teacher',
      phone: '13900139000'
    });
    await teacherUser.save();
    
    // 创建教师资料
    const teacher = new Teacher({
      user: teacherUser._id,
      bio: '清华大学数学系毕业，10年高考辅导经验，专注于帮助学生提高解题技巧和应试能力。',
      subjects: ['高中数学', '高等数学'],
      experience: 10,
      hourlyRate: 300,
      availability: [
        {
          day: 'mon',
          slots: [
            { start: '09:00', end: '12:00' },
            { start: '14:00', end: '18:00' }
          ]
        },
        {
          day: 'wed',
          slots: [
            { start: '10:00', end: '12:00' },
            { start: '14:00', end: '17:00' }
          ]
        }
      ],
      tags: ['高考专家', '耐心细致', '解题技巧']
    });
    await teacher.save();
    
    // 创建预约
    const booking = new Booking({
      teacher: teacher._id,
      student: student._id,
      subject: '高中数学',
      startTime: new Date('2023-10-15T14:00:00Z'),
      endTime: new Date('2023-10-15T16:00:00Z'),
      duration: 120,
      hourlyRate: 300,
      totalAmount: 600,
      payment: {
        platformFee: 60,
        status: 'success'
      }
    });
    await booking.save();
    
    console.log('✅ 数据库种子数据已创建');
    process.exit(0);
  } catch (error) {
    console.error('❌ 数据库种子创建失败:', error);
    process.exit(1);
  }
};

seedDatabase();