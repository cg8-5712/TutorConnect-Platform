import express from 'express';
import {
  getTeachers,
  getTeacherById,
  searchTeachers
} from '../controllers/teacherController.js';

const router = express.Router();

// 获取教师列表
router.get('/', getTeachers);

// 获取单个教师
router.get('/:id', getTeacherById);

// 搜索教师
router.post('/search', searchTeachers);

export default router;