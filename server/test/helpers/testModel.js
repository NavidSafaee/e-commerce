require('dotenv').config();

const User = require('../../src/models/userModel');
const Product = require('../../src/models/productModel');
const Cart = require('../../src/models/cartModel');

async function createTestUser() {
    const user = new User({
        username: 'test',
        email: 'test@gmail.com',
        password: '$2a$12$y9zH3zr4LIFnUh.j14dU1OpizOBMXDGBgYR9in0yvtLMQeFdFnMHe',
        phoneNumber: '09111111111',
        confirmPassword: '$2a$12$y9zH3zr4LIFnUh.j14dU1OpizOBMXDGBgYR9in0yvtLMQeFdFnMHe'
    });
    await user.save();
    return user;
}

async function createTestProduct() {
    const product = new Product({
        title: 'test',
        price: 1,
        category: 'CHAIR',
        imageUrl: 'images/products/test.png',
        rate: 1,
    });
    await product.save();
    return product;
}

async function createTestCart(userId, productId) {
    const cart = new Cart({
        user: userId,
        items: [
            { product: productId, quantity: 1 }
        ]
    });
    await cart.save();
    return cart;
}

async function clearDatabase() {
    await User.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
}

module.exports = {
    createTestUser,
    createTestProduct,
    createTestCart,
    clearDatabase
};

