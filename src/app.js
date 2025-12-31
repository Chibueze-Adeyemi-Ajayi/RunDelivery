const http = require('http'); // Import http module
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const config = require('./config/config');
const logger = require('./utils/logger');
const Database = require('./config/Database');
const SocketService = require('./services/SocketService'); // Import SocketService
const swaggerSpecs = require('./config/swagger');

class App {
    constructor() {

        this.app = express();
        this.server = http.createServer(this.app); // Create HTTP server
        this.database = new Database(config.db.uri);

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.connectDatabase();

        // Initialize Socket Service
        this.socketService = new SocketService(this.server);

        // Expose socket service globally or via dependency injection if needed
        global.socketService = this.socketService;
    }

    initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
    }

    initializeRoutes() {
        // Swagger Documentation Route
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

        this.app.use('/api/v1', routes);

        // 404 Handler
        this.app.use((req, res, next) => {
            res.status(404).json({ status: 'error', message: 'Not Found' });
        });

        // Global Error Handler
        this.app.use((err, req, res, next) => {
            logger.error(err.message);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        });
    }

    async connectDatabase() {
        await this.database.connect();
    }

    listen() {
        // Listen on the HTTP server, not the Express app directly
        this.server.listen(config.app.port, () => {
            logger.info(`Server is running on port ${config.app.port} in ${config.app.env} mode`);
        });
    }
}

module.exports = new App();
