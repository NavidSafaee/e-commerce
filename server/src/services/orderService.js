const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

async function postOrder(userId, reqBody, role) {
    if (role === 'ADMIN') {

        const { orderItems, deliveryDate } = reqBody;

        orderItems.forEach(async item => {
            if (item.product.productId) {
                const product = await Product.findById(item.product.productId);

                if (!product) {
                    const error = new Error(`No product with id ${item.product._id} was found`);
                    error.statusCode = 404;
                    throw error;
                }

                if (product.title !== item.product.title) {
                    const error = new Error('product title and id doesn\'t match');
                    error.statusCode = 400;
                    throw error;
                }
            }
        });

        const order = new Order({
            user: userId,
            items: orderItems,
            isDelivered: false,
            deliveryDate
        });

        await order.save();
        return order;

    } else if (role === 'CUSTOMER') {
        const { discountPercentage } = reqBody;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const error = new Error('Cart not found!');
            error.statusCode = 404;
            throw error;
        }
        await cart.populate('items.product');

        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product.quantity === 0) {
                const error = new Error('The product is not available in stock');
                error.statusCode = 400;
                throw error;
            }
            product.quantity -= item.quantity;

            if (product.quantity < 0) {
                const error = new Error(`The quantity of a product with id ${item.product._id} in your order is more than the number in stock`);
                error.statusCode = 400;
                throw error;
            }
        }

        const orderItems = await Promise.all(cart.items.map(async item => {
            const product = await Product.findById(item.product._id);
            product.quantity -= item.quantity;
            await product.save();

            return {
                product: item.product.restrictInfo(),
                quantity: item.quantity,
                _id: item._id
            }
        }));

        const todayDate = new Date();
        const order = new Order({
            user: userId,
            items: orderItems,
            discountPercentage,
            deliveryDate: todayDate.setDate(todayDate.getDate() + 2)
        });

        await order.save();
        await cart.deleteOne();
        return order;
    }
}

async function getCustomerOrders() {
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
            $match: { 'user.role': 'CUSTOMER' }
        },
        {
            $project: {
                'user.tokens': 0,
                'user.password': 0,
                'user.email': 0,
                'user.phoneNumber': 0,
                'user.birthDate': 0,
                'user.role': 0,
                'user.__v': 0
            }
        }
    ]);
    return orders;
}


async function getMyOrders(userId) {
    return await Order.find({ user: userId });
}

async function changeDeliveryState(userId, orderId) {
    const order = await Order.findById(orderId).populate({
        path: 'user',
        select: 'role'
    });

    if (!order) {
        const error = new Error('order not found');
        error.statusCode = 404;
        throw error;
    }

    if (order.user._id.toString() !== userId) {
        const error = new Error('you can\'t change another admins order');
        error.statusCode = 403;
        throw error;
    }

    if (order.user.role === 'CUSTOMER') {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
    }

    order.isDelivered = true;
    await order.save();
}


async function getCustomerDeliveredOrdersCount() {
    const orderCount = await Order.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $match: { 'user.role': 'CUSTOMER', deliveryDate: { $lte: new Date() } },
            
        },
        {
            $count: 'count'
        }
    ]);

    if (orderCount.length === 0) {
        return { count: 0 };
    }

    return orderCount[0];
}


async function getLastMonthDeliveredOrders() {
    let currentDate = new Date();
    const prevMonth = currentDate.setMonth(currentDate.getMonth() - 1);

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