const Product = require('../../models/product.model');
const Order = require('../../models/order.model');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function createNewProduct(req, res) {
  try {
    const product = new Product({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function getUpdateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function updateProduct(req, res) {
  try {
    const product = new Product({
      ...req.body,
      _id: req.params.id
    });

    if (req.file) {
      product.replaceImage(req.file.filename);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.findAll();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function updateOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    order.status = req.body.newStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully.',
      data: {
        orderId: req.params.id,
        status: order.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  getProducts,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder
};