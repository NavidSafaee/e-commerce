const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

async function getCart(userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        const error = new Error('Cart not found!');
        error.statusCode = 404;
        throw error;
    }

    return cart.items;
}

async function addToCart(userId, productId) {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }


    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity: 1
                }
            ]
        });
    } else {
        const index = cart.items.findIndex(item => {
            return item.product.toString() === productId;
        });

        if (index >= 0) {
            cart.items[index].quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
    }
    await cart.save();
    return cart;
}


module.exports = {
    getCart,
    addToCart
}