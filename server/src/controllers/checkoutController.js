const {
    createCheckoutSessionId
} = require('../services/checkoutService');


async function httpCreateCheckoutSessionId(req, res, next) {
    try {
        const userId = req.userId;
        const response = await createCheckoutSessionId(req, userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports ={
    httpCreateCheckoutSessionId
}