const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('../models/cartModel');

async function createCheckoutSessionId(userId, discount) {
    console.log(discount);
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
        const error = new Error('Cart not found');
        error.statusCode = 404;
        throw error;
    }

    if (cart.items.length === 0) {
        const error = new Error('Cart items not found');
        error.statusCode = 404;
        throw error;
    }

    discount = discount || 0;
    
    const lineItems = cart.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.title,
                images: [item.product.imageUrls[0]]
            },
            unit_amount: item.product.price * (1 - item.product.discount.percentage) * (1 - discount) * 100,
        },
        quantity: item.quantity,

    }));

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: `http://localhost:3030/checkout/success`,
        cancel_url: `http://localhost:3030/checkout/cancel`
    });


    return { id: session.id };
}


module.exports = {
    createCheckoutSessionId
}