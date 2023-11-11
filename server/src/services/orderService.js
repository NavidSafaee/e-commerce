const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

async function postOrder(userId) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        const error = new Error('Cart not found!');
        error.statusCode = 404;
        throw error
    }

    await cart.populate('items.product');

    const order = new Order({
        user: req.userId,
        items: cart.items
    });

    await order.save();
}

async function getOrder(userId) {
    const order = await Order.findOne({ user: userId });
    if (!order) {
        const error = new Error('Order not found!');
        error.statusCode = 404;
        throw error
    }
    return order;
}


module.exports = {
    postOrder,
    getOrder
}