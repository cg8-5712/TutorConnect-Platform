import express from 'express';
import {
  createBooking,
  getUserBookings
} from '../controllers/bookingController.js';

const router = express.Router();

// 创建预约
router.post('/', createBooking);

// 获取用户预约
router.get('/', getUserBookings);

export default router;