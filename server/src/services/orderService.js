const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

async function postOrder(userId, reqBody, role) {
    if (role === 'ADMIN') {

        const { orderItems, deliveryDate } = reqBody;

        const order = new Order({
            user: userId,
            items: orderItems,
            delivered: false,
            deliveryDate
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

        const todayDate = new Date();

        const order = new Order({
            user: userId,
            items: cart.items,
            delivered: false,
            deliveryDate: todayDate.setDate(todayDate.getDate() + 2)
        });

        await cart.deleteOne();
        await order.save();
    }
}

async function getCustomerOrders() {
    const orders =  await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $match: { 'user.role': 'CUSTOMER' }
        }
    ]);
    return orders;
}


async function getMyOrders(userId) {
    return await Order.find({ user: userId });
}

async function changeDeliveryState(orderId) {
    const order = await Order.findById(orderId).populate({
        path: 'user',
        select: 'role'
    });

    if (order.user.role === 'CUSTOMER') {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
    }

    order.delivered = true;
    await order.save();
}


async function getCustomerDeliveredOrdersCount() {
    const orderCount =  await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $match: { 'user.role': 'CUSTOMER', deliveryDate: { $lte: new Date() } }
        },
        {
            $count: 'count'
        }
    ]);

    return orderCount[0];
}


async function getLastMonthDeliveredOrders() {
    let currentDate = new Date();
    const prevMonth = currentDate.setDate(currentDate.getDate() - 2);  
    
    const orders = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $match: {
                'user.role': 'CUSTOMER', deliveryDate: {
                    $lte: new Date(),
                    $gte: new Date(prevMonth)
                }
            }
        },
        {
            $project: { _id: 0, deliveryDate: 1 }
        }
    ]);
    return orders;
}

module.exports = {
    postOrder,
    getCustomerOrders,
    changeDeliveryState,
    getMyOrders,
    getCustomerDeliveredOrdersCount,
    getLastMonthDeliveredOrders
}