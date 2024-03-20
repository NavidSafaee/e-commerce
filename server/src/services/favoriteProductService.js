const FavoriteProduct = require('../models/favoriteProduct');


async function getMe(userId) {
    return await FavoriteProduct.find({ user: userId });
}


async function create(userId, productId) {
    const favoriteProduct = new FavoriteProduct({
        user: userId,
        product: productId
    });

    return favoriteProduct.save();
}


async function remove(userId, productId) {
    const deletedFavoriteProduct = FavoriteProduct.findOneAndDelete({
        user: userId,
        product: productId
    }); 
    if (!deletedFavoriteProduct) {
        const error = new Error('product not found in favorite products list');
        error.statusCode(404);
        throw error;
    }
}


module.exports = {
    getMe,
    create,
    remove
}