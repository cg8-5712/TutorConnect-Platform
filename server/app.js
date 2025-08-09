import express from 'express';
import configureExpress from './src/config/express.js';
import errorHandler from './src/middlewares/errorMiddleware.js';
import apiRoutes from './src/routes/index.js';

// Initialize app
const app = express();

// Configure Express with all middleware
configureExpress(app);

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

export default app;