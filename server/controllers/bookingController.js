import Booking from '../models/Booking.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

// 创建预约
export const createBooking = async (req, res) => {
  try {
    const { teacherId, studentId, startTime, endTime, subject } = req.body;
    
    // 验证时间有效性
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (end <= start) {
      return res.status(400).json({ message: '结束时间必须在开始时间之后' });
    }
    
    const duration = (end - start) / (1000 * 60); // 分钟
    if (duration < 30) {
      return res.status(400).json({ message: '预约时长至少30分钟' });
    }
    
    // 获取教师信息
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: '教师未找到' });
    }
    
    // 检查时间是否可用
    const existingBooking = await Booking.findOne({
      teacher: teacherId,
      startTime: { $lt: end },
      endTime: { $gt: start },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingBooking) {
      return res.status(400).json({ 
        message: '该时间段已被预约',
        conflict: existingBooking
      });
    }
    
    // 计算费用
    const hours = Math.ceil(duration / 60);
    const totalAmount = hours * teacher.hourlyRate;
    const platformFee = Math.floor(totalAmount * 0.1); // 10% 平台费
    
    // 创建预约
    const booking = new Booking({
      teacher: teacherId,
      student: studentId,
      subject,
      startTime: start,
      endTime: end,
      duration,
      hourlyRate: teacher.hourlyRate,
      totalAmount,
      payment: {
        platformFee,
        status: 'pending'
      }
    });
    
    await booking.save();
    
    // 更新教师预约计数
    await Teacher.findByIdAndUpdate(teacherId, {
      $inc: { bookingCount: 1 }
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ 
      message: '创建预约失败',
      error: error.message
    });
  }
};

// 获取用户预约
export const getUserBookings = async (req, res) => {
  try {
    const { userId, status } = req.query;
    
    const filter = { 
      $or: [
        { teacher: userId },
        { student: userId }
      ]
    };
    
    if (status) filter.status = status;
    
    const bookings = await Booking.find(filter)
      .populate('teacher', 'user')
      .populate('student', 'fullName')
      .sort({ startTime: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ 
      message: '获取预约列表失败',
      error: error.message
    });
  }
};