const { validationResult } = require('express-validator');

const {
    postOrder,
    getOrders,
    changeReceivedState
} = require('../services/orderService');


async function httpPostOrder(req, res, next) {
    try {
        validationCheck(req);
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
        validationCheck(req);
        await changeReceivedState(req.params.orderId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

function validationCheck(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let err;
        if (errors.array()[0].msg === 'Invalid value(s)') {
            console.log(errors.array()[0].nestedErrors[0]);
            err = new Error(errors.array()[0].nestedErrors[0][0].msg);
        } else {
            err = new Error(errors.array()[0].msg);
        }

        err.statusCode = 400;
        err.data = errors.array();
        throw err;
    }
}



module.exports = {
    httpPostOrder,
    httpGetOrders,
    httpChangeReceivedState
}