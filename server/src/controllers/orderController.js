const validator = require('../utils/validator');
const {
    postOrder,
    getOrders,
    changeReceivedState
} = require('../services/orderService');


async function httpPostOrder(req, res, next) {
    try {
        validator(req);
        await postOrder(req.userId, req.body.orderItems, req.role);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}


async function httpGetOrders(req, res, next) {
    try {
        const response = await getOrders(req.userId, req.query);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpChangeReceivedState(req, res, next) {
    try {
        validator(req);
        await changeReceivedState(req.params.orderId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpPostOrder,
    httpGetOrders,
    httpChangeReceivedState
}