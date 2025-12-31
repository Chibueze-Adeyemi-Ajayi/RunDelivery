const socketIo = require('socket.io');
const jwt = require('jsonwebtoken'); // Assuming JWT for auth
const logger = require('../utils/logger');
const config = require('../config/config');

class SocketService {
    constructor(server) {
        this.io = socketIo(server, {
            cors: {
                // Allow any origin with credentials
                origin: (origin, callback) => {
                    callback(null, true);
                },
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                credentials: true
            }
        });

        this.initializeMiddlewares();
        this.initializeEvents();
    }

    initializeMiddlewares() {

        this.io.use((socket, next) => {
            logger.info(`Socket connection attempt: ${socket.id}`);
            next();
        });
    }

    initializeEvents() {
        this.io.on('connection', (socket) => {
            logger.info(`Client connected: ${socket.id}`);

            // Question 1.1: Driver/Customer joins order room
            socket.on('join_order', (orderId) => {
                socket.join(`order_${orderId}`);
                logger.info(`Socket ${socket.id} joined room order_${orderId}`);
            });

            // Question 1.2: Driver sends location updates
            socket.on('update_location', (data) => {
                const { orderId, latitude, longitude } = data;

                // Question 1.2: Emit update to room
                socket.to(`order_${orderId}`).emit('driver_location', {
                    orderId,
                    latitude,
                    longitude,
                    timestamp: new Date()
                });

            });

            // Question 1.3: Handle disconnection
            socket.on('disconnect', () => {
                logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }

    // Question 2.2: Method to emit status events from backend services
    emitOrderStatus(orderId, status, payload = {}) {
        this.io.to(`order_${orderId}`).emit('order_status_change', {
            orderId,
            status,
            timestamp: new Date(),
            ...payload
        });
    }
}

module.exports = SocketService;
