const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ]
});

// userSchema.methods.addToCart = async function(productId) {
//     const index = this.cart.findIndex(cartItem => {
//         return cartItem.product.toString() === productId;        
//     });

//     if (index >= 0) {
//         this.cart[index].quantity += 1;
//     } else {
//         this.cart.push({ product: productId, quantity: 1 });     
//     }

//     await this.save();
// }

module.exports = model('User', userSchema);