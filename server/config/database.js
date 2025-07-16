const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        const dbURI = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;