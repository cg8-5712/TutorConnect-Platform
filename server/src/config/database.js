const mongoose = require('mongoose');
const config = require('./config.js');

const connectDB = async () => {
    try {
        const dbURI = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
