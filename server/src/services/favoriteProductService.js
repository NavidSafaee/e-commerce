const createError = require('http-errors');

const FavoriteProduct = require('../models/favoriteProduct');


async function getMe(userId) {
    return await FavoriteProduct.find({ user: userId }).populate('product');
}


async function create(userId, productId) {
    const favoriteProduct = new FavoriteProduct({
        user: userId,
        product: productId
    });

    await throwErrorIfProductExists(productId);
    return (await favoriteProduct.save()).populate('product');
}


async function remove(userId, productId) {
    const deletedFavoriteProduct = await FavoriteProduct.findOneAndDelete({
        user: userId,
        product: productId
    }); 
    if (!deletedFavoriteProduct) throw createError(404, 'product not found in favorite products list');
    FavoriteProduct.deleteOne(deletedFavoriteProduct);
}


async function throwErrorIfProductExists(productId) {
    const foundProduct = await FavoriteProduct.findOne({ product: productId });
    if (foundProduct) throw createError(409, 'this product is already exists in your favorite list');
}


module.exports = {
    getMe,
    create,
    remove
}