const { getDiscountPercentage } = require('../services/userDiscountService');

async function httpGetDiscountPercentage(req, res, next) {
    try {
        const discountCode = req.params.discountCode;
        const response = await getDiscountPercentage(discountCode);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetDiscountPercentage
}