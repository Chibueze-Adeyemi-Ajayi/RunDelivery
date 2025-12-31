const BaseService = require('./BaseService');
const Order = require('../models/Order');

class OrderService extends BaseService {
    constructor() {
        super(Order);
    }

    async updateStatus(orderId, status) {
        // Question 2.2: Updating status and emitting event
        const order = await this.update(orderId, {
            status,
            $push: { history: { status, timestamp: new Date() } }
        });

        if (order) {
            // Emit real-time event through the global socket service (or injected one)
            if (global.socketService) {
                global.socketService.emitOrderStatus(orderId, status, { order });
            }
        }
        return order;
    }
}

module.exports = new OrderService();
