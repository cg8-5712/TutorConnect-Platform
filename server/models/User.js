import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'admin'], 
    default: 'student' 
  },
  phone: {
    type: String,
    match: [/^1[3-9]\d{9}$/, '请输入有效的手机号码']
  },
  avatarUrl: String,
  verified: { 
    type: Boolean, 
    default: false 
  },
  lastLogin: Date,
  preferences: {
    notification: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    }
  }
});

// 虚拟字段
userSchema.virtual('isTeacher').get(function() {
  return this.role === 'teacher';
});

// 索引
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;