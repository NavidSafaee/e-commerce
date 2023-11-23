const { validationResult } = require('express-validator');

const {
    getCart,
    addToCart
} = require('../services/cartService');

async function httpGetCart(req, res, next) {
    try {
        const result = await getCart(req.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function httpAddToCart(req, res, next) {
    try {
        validationCheck(req);
        const productId = req.body.productId;
        
        const response = await addToCart(req.userId, productId);
        res.status(200).json(response);
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
    httpGetCart,
    httpAddToCart
}