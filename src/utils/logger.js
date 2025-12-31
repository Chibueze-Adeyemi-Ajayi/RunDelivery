const winston = require('winston');
const config = require('../config/config');
const path = require('path');

const logger = winston.createLogger({
    level: config.log.level,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: path.join('src', 'logs', 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join('src', 'logs', 'combined.log') }),
    ],
});

if (config.app.env !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

module.exports = logger;
