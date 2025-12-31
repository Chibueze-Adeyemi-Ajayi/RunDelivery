const express = require('express');
const orderController = require('../controllers/OrderController');
const validate = require('../middlewares/validate');
const orderValidation = require('../validations/orderValidation');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customer
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         customer:
 *           type: string
 *           description: The user ID of the customer
 *         driver:
 *           type: string
 *           description: The user ID of the driver
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *         status:
 *           type: string
 *           enum: [PENDING, PICKED_UP, IN_TRANSIT, DELIVERED]
 *           default: PENDING
 *         currentLocation:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         createdAt:
 *           type: string
 *           format: date
 *       example:
 *         id: 60a7e0a8c2e646274494165d
 *         customer: 60a7e0a8c2e646274494165a
 *         status: PENDING
 *         items: [{ name: "Box", quantity: 1 }]
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.post('/', validate(orderValidation.createOrder), orderController.createOrder);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PICKED_UP, IN_TRANSIT, DELIVERED]
 *     responses:
 *       200:
 *         description: The order status was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.patch('/:id/status', validate(orderValidation.updateOrderStatus), orderController.updateOrderStatus);

module.exports = router;
