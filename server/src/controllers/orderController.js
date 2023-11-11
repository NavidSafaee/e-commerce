const { 
    postOrder,
    getOrder
 } = require('../services/orderService');


async function httpPostOrder(req, res, next) {
    try {
        postOrder(req.userId);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}


async function httpGetOrder(req, res, next) {
    try {
        getOrder(req.userId);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    httpPostOrder,
    httpGetOrder
}