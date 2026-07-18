/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all available products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - id: "6879f77f36b2b4e37dfdc123"
 *                   title: "Gaming Laptop"
 *                   summary: "High performance laptop"
 *                   price: 2499.99
 *                   description: "Powerful gaming laptop with RTX graphics."
 *                   image: "laptop.jpg"
 *                   imagePath: "product-data/images/laptop.jpg"
 *                   imageUrl: "/products/assets/images/laptop.jpg"
 *                 - id: "6879f77f36b2b4e37dfdc124"
 *                   title: "Wireless Mouse"
 *                   summary: "Ergonomic wireless mouse"
 *                   price: 49.99
 *                   description: "Rechargeable Bluetooth mouse."
 *                   image: "mouse.jpg"
 *                   imagePath: "product-data/images/mouse.jpg"
 *                   imageUrl: "/products/assets/images/mouse.jpg"
 */
router.get('/products', productsController.getAllProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Returns the details of a single product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               success: true
 *               data:
 *                 id: "6879f77f36b2b4e37dfdc123"
 *                 title: "Gaming Laptop"
 *                 summary: "High performance laptop"
 *                 price: 2499.99
 *                 description: "Powerful gaming laptop with RTX graphics."
 *                 image: "laptop.jpg"
 *                 imagePath: "product-data/images/laptop.jpg"
 *                 imageUrl: "/products/assets/images/laptop.jpg"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Product not found"
 */
router.get('/products/:id', productsController.getProductById);

module.exports = router;