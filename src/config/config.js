require('dotenv').config();

const config = {
    app: {
        name: process.env.APP_NAME || 'RunDelivery API',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        uri: process.env.DB_URI || 'mongodb://localhost:27017/rundelivery',
    },
    log: {
        level: process.env.LOG_LEVEL || 'info',
    }
};

module.exports = config;
