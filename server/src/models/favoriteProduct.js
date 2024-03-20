const { Schema, model } = require('mongoose');

const favoriteProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true });


module.exports = model('Favorite_products', favoriteProductSchema);


