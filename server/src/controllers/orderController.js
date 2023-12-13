const validator = require('../utils/validator');
const {
    postOrder,
    getCustomerOrders,
    changeDeliveryState,
    getMyOrders,
    getCustomerDeliveredOrdersCount,
    getLastMonthDeliveredOrders
} = require('../services/orderService');


async function httpPostOrder(req, res, next) {
    try {
        validator(req);
        await postOrder(req.userId, req.body, req.role);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}


async function httpGetCustomerOrders(req, res, next) {
    try {
        const response = await getCustomerOrders();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpChangeDeliveryState(req, res, next) {
    try {
        validator(req);
        await changeDeliveryState(req.params.orderId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function httpGetMyOrders(req, res, next) {
    try {
        const response = await getMyOrders(req.userId);
        res.send(200).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpGetCustomerDeliveredOrdersCount(req, res, next) {
    try {
        const response = await getCustomerDeliveredOrdersCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetLastMonthDeliveredOrders(req, res, next) {
    try {
        const response = await getLastMonthDeliveredOrders();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpPostOrder,
    httpGetCustomerOrders,
    httpChangeDeliveryState,
    httpGetMyOrders,
    httpGetCustomerDeliveredOrdersCount,
    httpGetLastMonthDeliveredOrders
}