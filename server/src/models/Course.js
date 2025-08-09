import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 关联到教师用户
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;