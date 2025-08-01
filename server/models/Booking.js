import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subject: String,
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: Number, // 分钟
    required: true,
    min: 30
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'], 
    default: 'pending' 
  },
  hourlyRate: { 
    type: Number, 
    required: true 
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  studentNotes: String,
  teacherNotes: String,
  payment: {
    method: { 
      type: String, 
      enum: ['alipay', 'wechat', 'bank', 'platform'] 
    },
    transactionId: String,
    status: { 
      type: String, 
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending'
    },
    platformFee: Number,
    details: mongoose.Schema.Types.Mixed // 存储支付网关原始响应
  },
  review: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: Date
  }
}, {
  timestamps: true
});

// 索引
bookingSchema.index({ teacher: 1, status: 1 });
bookingSchema.index({ student: 1, status: 1 });
bookingSchema.index({ startTime: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;