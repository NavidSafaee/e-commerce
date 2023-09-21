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
        await addToCart(req.userId, req.body.productId);
        res.status(200).json({
            message: 'added to cart successfully'
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetCart,
    httpAddToCart
}