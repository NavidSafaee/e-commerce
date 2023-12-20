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
    quantity: {
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
    maxQuantityAllowedInCart: Number,
    rate: Number,
    status: String,
    discount: Number,
    discountExpiration: Date
});

productSchema.methods.toJSON = function () {
    var productObj = this.toObject();
    delete productObj.description;
    productObj.imageUrl = productObj.imageUrls[0];
    delete productObj.imageUrls;
    return productObj;
}

module.exports = model('Product', productSchema);