const favoriteProductService = require('../services/favoriteProductService');
const validate = require('../utils/validator');

async function getMe(req, res, next) {
    try {
        const userId = req.userId;
        const response = await favoriteProductService.getMe(userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


async function create(req, res, next) {
    try {
        validate(req);
        const productId = req.body.productId;
        const userId = req.userId;

        const response = await favoriteProductService.create(userId, productId);
        res.status(201).json(response);

    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const productId = req.params.productId;
        const userId = req.userId;

        await favoriteProductService.remove(userId, productId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getMe,
    create,
    remove
}