const Order = require('../../models/order.model');
const User = require('../../models/user.model');

async function getOrders(req, res, next) {
  try {

    // Temporary until JWT middleware is added
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.'
      });
    }

    const orders = await Order.findAllForUser(userId);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {

  // Temporary until JWT middleware is added
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required.'
    });
  }

  const cart = req.body.cart;

  if (
    !cart ||
    !cart.items ||
    cart.items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty.'
    });
  }

  let userDocument;

  try {

    userDocument = await User.findById(userId);

    if (!userDocument) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {

    const result = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      orderId: result.insertedId
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrders,
  addOrder
};