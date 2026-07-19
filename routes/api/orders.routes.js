const express = require('express');

const ordersController = require('../../controllers/api/orders.controller');

const router = express.Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns all orders belonging to the authenticated user.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - id: "6879f77f36b2b4e37dfdc456"
 *                   status: "pending"
 *                   date: "2026-07-19T12:00:00.000Z"
 *                   formattedDate: "Sat, July 19, 2026"
 *                   userData:
 *                     id: "6879f77f36b2b4e37dfdc111"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                   productData:
 *                     totalQuantity: 2
 *                     totalPrice: 2549.98
 *                 - id: "6879f77f36b2b4e37dfdc457"
 *                   status: "fulfilled"
 *                   date: "2026-07-15T09:30:00.000Z"
 *                   formattedDate: "Tue, July 15, 2026"
 *                   userData:
 *                     id: "6879f77f36b2b4e37dfdc111"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                   productData:
 *                     totalQuantity: 1
 *                     totalPrice: 49.99
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', ordersController.getOrders);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order from the authenticated user's current shopping cart.
 *     tags:
 *       - Orders
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Order created successfully."
 *               orderId: "6879f77f36b2b4e37dfdc456"
 *       400:
 *         description: Invalid request or empty cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Cart is empty."
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', ordersController.addOrder);

module.exports = router;