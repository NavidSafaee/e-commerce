const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('../models/cartModel');

async function createCheckoutSessionId(req, userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    const lineItems = cart.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.title,
                image: [item.product.imageUrls[0]]
            },
            unit_amount: item.product.price * 100
        },
        quantity: item.product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_type: ['card'],
        line_items: lineItems,
        success_url: `http://localhost:5173/checkout/success`,
        cancel_url: `http://localhost:5173/checkout/cancel`
    });

    return { sessionId: session.id };
}


module.exports = {
    createCheckoutSessionId
}