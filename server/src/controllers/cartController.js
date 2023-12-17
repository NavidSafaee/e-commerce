
const validator = require('../utils/validator');
const {
    getMyCart,
    addToCart,
    deleteFromCart,
    changeCartItemQuantity,
    getCartItemQuantity
} = require('../services/cartService');

async function httpGetMyCart(req, res, next) {
    try {
        const response = await getMyCart(req.userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpAddToCart(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;
        const response = await addToCart(req.userId, productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpDeleteFromCart(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await deleteFromCart(req.userId, productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpChangeCartItemQuantity(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;
        const action = req.query.action;
        
        const response = await changeCartItemQuantity(req.userId, productId, action);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetCartItemQuantity(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await getCartItemQuantity(productId);
        res.status(200).json({quantity: response});
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetMyCart,
    httpAddToCart,
    httpGetCartItemQuantity,
    httpDeleteFromCart,
    httpChangeCartItemQuantity
}