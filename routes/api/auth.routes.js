const express = require('express');
const authController = require('../../controllers/api/auth.controller');

const router = express.Router();

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation error.
 */
router.post('/signup', authController.signup);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful.
 */
router.post('/logout', authController.logout);

module.exports = router;