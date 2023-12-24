const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


async function getMyCart(userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        const error = new Error('Cart not found!');
        error.statusCode = 404;
        throw error;
    }

    const cartItems = cart.items.map(item => {
        return {
            product: item.product.restrictInfo(),
            quantity: item.quantity
        }
    });

    return cartItems;
}



async function addToCart(userId, productId) {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }

    if (product.quantity === 0) {
        const error = new Error('The product is not available in stock');
        error.statusCode = 400;
        throw error;
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: []
        });
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);
    if (cartItem) {
        const error = new Error('This product is already in your cart');
        error.statusCode = 400;
        throw error;
    }
    cart.items.push({ product: productId, quantity: 1 });

    await cart.save();
    await cart.populate('items.product');

    let totalQuantity = 0;
    cart.items.forEach(item => totalQuantity += item.quantity);
    return { totalQuantity };
}



async function deleteFromCart(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        const error = new Error('Cart not found!');
        error.statusCode = 404;
        throw error;
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);
    if (!cartItem) {
        const error = new Error('Product not found in cart');
        error.statusCode = 404;
        throw error;
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    let totalQuantity = 0;
    if (cart.items.length === 0) {
        await cart.deleteOne();
        return { totalQuantity };
    }

    await cart.save();
    await cart.populate('items.product');

    cart.items.forEach(item => totalQuantity += item.quantity);
    return { totalQuantity };
}



async function changeCartItemQuantity(userId, productId, action) {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        const error = new Error('Cart not found!');
        error.statusCode = 404;
        throw error;
    }

    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index < 0) {
        const error = new Error('Product not found in cart');
        error.statusCode = 404;
        throw error;
    }

    switch (action) {
        case 'increase':
            console.log('hi');

            if (cart.items[index].quantity + 1 > product.maxQuantityAllowedInCart) {
                const error = new Error('You cannot add more than the allowed quantity of this product');
                error.statusCode = 400;
                throw error;
            }

            if (cart.items[index].quantity + 1 > product.quantity) {
                const error = new Error(`The quantity of this product is less than ${cart.items[index].quantity + 1} in stock`);
                error.statusCode = 400;
                throw error;
            }

            cart.items[index].quantity += 1;
            break;

        case 'decrease':
            if (cart.items[index].quantity === 1) {
                const error = new Error('There is only one of this product in your shopping cart');
                error.statusCode = 400;
                throw error;
            }
            cart.items[index].quantity -= 1;
            break;
    }

    await cart.save();
    await cart.populate('items.product');

    let totalQuantity = 0;
    cart.items.forEach(item => totalQuantity += item.quantity);
    return { totalQuantity };
}



async function getCartItemQuantity(userId, productId) {
    const cart = await Cart.findOne({ user: userId, 'items.product': productId });

    if (!cart) {
        const error = new Error('Cart or item not found!');
        error.statusCode = 404;
        throw error;
    }

    const item = cart.items.find(item => {
        return item.product.toString() === productId;
    });

    return item.quantity;
}


module.exports = {
    getMyCart,
    addToCart,
    deleteFromCart,
    changeCartItemQuantity,
    getCartItemQuantity
}