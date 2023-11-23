const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

async function postOrder(userId, orderItems, role) {
    if (role === 'ADMIN') {

        const order = new Order({
            user: userId,
            items: orderItems,
            received: false
        });

        await order.save();

    } else if (role === 'CUSTOMER') {

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const error = new Error('Cart not found!');
            error.statusCode = 404;
            throw error;
        }

        await cart.populate('items.product');

        const order = new Order({
            user: userId,
            items: cart.items,
            received: false
        });

        await cart.deleteOne();
        await order.save();
    }
}

async function getOrders(userId, query) {
    const orders = await Order.find({ user: userId, received: query.received });
    return orders;
}

async function changeReceivedState(orderId) {
    const order = await Order.findById(orderId).populate('user');

    if (order.user.role === 'CUSTOMER') {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
    }

    order.received = true;
    await order.save();
}

module.exports = {
    postOrder,
    getOrders,
    changeReceivedState
}