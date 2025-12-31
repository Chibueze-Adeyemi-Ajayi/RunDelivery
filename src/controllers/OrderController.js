const BaseController = require('./BaseController');
const orderService = require('../services/OrderService');

class OrderController extends BaseController {
    constructor() {
        super();
        this.orderService = orderService;
        this.createOrder = this.createOrder.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
    }

    async createOrder(req, res) {
        try {
            const order = await this.orderService.create(req.body);
            return this.sendResponse(res, 201, 'Order created', order);
        } catch (error) {
            return this.sendError(res, 400, 'Error creating order', error);
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { status } = req.body;
            const order = await this.orderService.updateStatus(req.params.id, status);
            if (!order) return this.sendError(res, 404, 'Order not found');
            return this.sendResponse(res, 200, 'Order status updated', order);
        } catch (error) {
            return this.sendError(res, 500, 'Error updating status', error);
        }
    }
}

module.exports = new OrderController();
