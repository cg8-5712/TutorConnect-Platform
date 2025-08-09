import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  bio: { 
    type: String, 
    required: true,
    minlength: [50, '个人简介至少需要50个字符']
  },
  subjects: [{ 
    type: String,
    required: true
  }],
  experience: { 
    type: Number, 
    min: 0,
    default: 0 
  },
  hourlyRate: { 
    type: Number, 
    required: true,
    min: [50, '课时费不能低于50元']
  },
  rating: { 
    type: Number, 
    min: 0,
    max: 5,
    default: 0 
  },
  ratingCount: { 
    type: Number, 
    default: 0 
  },
  verificationStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  verificationDocument: String,
  availability: [{
    day: { 
      type: String, 
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      required: true
    },
    slots: [{
      start: { type: String, required: true }, // 格式: "09:00"
      end: { type: String, required: true }
    }]
  }],
  tags: [String],
  metadata: {
    certificates: [String],
    teachingAwards: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// 计算平均评分
teacherSchema.virtual('averageRating').get(function() {
  if (this.ratingCount === 0) return 0;
  return this.rating / this.ratingCount;
});

// 索引
teacherSchema.index({ 'subjects': 1 });
teacherSchema.index({ 'hourlyRate': 1 });
teacherSchema.index({ 'rating': -1 });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;