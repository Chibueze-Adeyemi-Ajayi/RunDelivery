const mongoose = require('mongoose');
const logger = require('../utils/logger');

class Database {
    constructor(uri) {
        this.uri = uri;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: "run_delivery"
            });
            logger.info('Database connected successfully');
        } catch (error) {
            logger.error('Database connection error:', error);
            process.exit(1);
        }
    }

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            logger.info('Database disconnected');
        }
    }
}

module.exports = Database;
