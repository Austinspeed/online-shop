const Product = require('../../models/product.model');

async function getCart(req, res) {
  const cart = res.locals.cart;

  return res.status(200).json({
    success: true,
    data: cart
  });
}

async function addCartItem(req, res, next) {
  if (!req.body.productId) {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required.'
    });
  }

  try {
    const product = await Product.findById(req.body.productId);

    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;

    return res.status(201).json({
      success: true,
      message: 'Product added to cart.',
      data: {
        totalItems: cart.totalQuantity,
        totalPrice: cart.totalPrice
      }
    });
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    next(error);
  }
}

function updateCartItem(req, res) {
  if (!req.body.quantity || Number(req.body.quantity) < 1) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be greater than zero.'
    });
  }

  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
  req.params.productId,
  Number(req.body.quantity)
);

  req.session.cart = cart;

  return res.status(200).json({
    success: true,
    message: 'Cart updated.',
    data: {
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice
    }
  });
}

module.exports = {
  getCart,
  addCartItem,
  updateCartItem
};