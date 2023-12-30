const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Cart = require('../models/cartModel');

async function createCheckoutSessionId(userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    // console.log(cart.items);

    const lineItems = cart.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.title,
                images: [item.product.imageUrls[0]]
            },
            unit_amount: item.product.price * 100
        },
        quantity: item.quantity
    }));

    console.log('nasirrrrr', lineItems[0].price_data.product_data);

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: `http://localhost:5173/checkout/success`,
        cancel_url: `http://localhost:5173/checkout/cancel`
    });

    // console.log(session);

    return { id: session.id };
}


module.exports = {
    createCheckoutSessionId
}