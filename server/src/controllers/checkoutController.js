const {
    createCheckoutSessionId
} = require('../services/checkoutService');


async function httpCreateCheckoutSessionId(req, res, next) {
    try {
        const userId = req.userId;
        const discount = req.body.discount;
        const response = await createCheckoutSessionId(userId, discount);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports ={
    httpCreateCheckoutSessionId
}