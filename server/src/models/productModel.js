const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['CHAIR', 'SOFA', 'BENCH', 'STORAGE', 'FURNITURE', 'TABLE'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rate : {
        type: Number,
        required: true
    },
    status: String,
    newPrice: Number,
    discount : Number,
    discountExpiresAt: Date
});

module.exports = model('Product', productSchema);