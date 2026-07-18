const express = require('express');
const cartController = require('../../controllers/api/cart.controller');

const router = express.Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Retrieve the current shopping cart
 *     description: Returns all items currently stored in the user's shopping cart.
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 items:
 *                   - product:
 *                       id: "6879f77f36b2b4e37dfdc123"
 *                       title: "Gaming Laptop"
 *                     quantity: 2
 *                     totalPrice: 4999.98
 *                 totalQuantity: 2
 *                 totalPrice: 4999.98
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unauthorized."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unexpected server error."
 */
router.get('/', cartController.getCart);

/**
 * @openapi
 * /api/cart/items:
 *   post:
 *     summary: Add a product to the shopping cart
 *     description: Adds a product to the current shopping cart.
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: MongoDB Product ID
 *           example:
 *             productId: "6879f77f36b2b4e37dfdc123"
 *     responses:
 *       201:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Product added to cart."
 *               data:
 *                 totalItems: 3
 *                 totalPrice: 7549.97
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product ID is required."
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unexpected server error."
 */
router.post('/items', cartController.addCartItem);

/**
 * @openapi
 * /api/cart/items/{productId}:
 *   patch:
 *     summary: Update the quantity of a cart item
 *     description: Updates the quantity of an existing item in the shopping cart.
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: MongoDB Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *           example:
 *             quantity: 5
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Cart updated."
 *               data:
 *                 totalQuantity: 5
 *                 totalPrice: 12499.95
 *                 updatedItemPrice: 12499.95
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Quantity must be greater than zero."
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unexpected server error."
 */
router.patch('/items/:productId', cartController.updateCartItem);

module.exports = router;