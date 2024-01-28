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
    discount: {
        percentage: Number ,
        expirationDate: Date
    },
    maxQuantityAllowedInCart: Number
});

productSchema.methods.restrictInfo = function () {
    var productObj = this.toObject();
    delete productObj.description;
    productObj.imageUrl = productObj.imageUrls[0];
    delete productObj.imageUrls;
    return productObj;
}

module.exports = model('Product', productSchema);