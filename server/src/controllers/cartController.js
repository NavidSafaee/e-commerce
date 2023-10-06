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
        const productId = req.body.productId;
        if (!productId) {
            const error = new Error('product id must be provided');
            error.statusCode = 400;
            throw error;
        }
        const response = await addToCart(req.userId, productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetCart,
    httpAddToCart
}