import express from 'express';
import userRoutes from './userRoutes.js';
import teacherRoutes from './teacherRoutes.js';
import bookingRoutes from './bookingRoutes.js';

const router = express.Router();

// API Routes
router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);
router.use('/bookings', bookingRoutes);

// API Documentation
router.get('/docs', (_req, res) => {
    res.json({
        message: 'API Documentation',
        endpoints: {
            users: '/api/users',
            teachers: '/api/teachers',
            bookings: '/api/bookings'
        }
    });
});

export default router;