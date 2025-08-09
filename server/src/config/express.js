import cors from 'cors';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import loggerMiddleware from '../middlewares/loggerMiddleware.js';

export default function configureExpress(app) {
    console.log(chalk.cyan('🔧 Configuring Express...'));
    
    // Configure Express middleware
    app.use(cors());
    console.log(chalk.gray('  ✓ CORS enabled'));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    console.log(chalk.gray('  ✓ Body parser configured'));
    
    app.use(loggerMiddleware);
    console.log(chalk.gray('  ✓ Logger middleware enabled'));
    
    console.log(chalk.green('✅ Express configured successfully\n'));
}