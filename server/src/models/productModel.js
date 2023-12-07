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
    imageUrls: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rate : Number,
    status: String,
    discount : Number,
    discountExpiresAt: Date
});

module.exports = model('Product', productSchema);