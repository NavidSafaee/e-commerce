const { model, Schema } = require('mongoose');

const ratingsAndReviewsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true  
    },
    validationStatus: {
        type: String,
        enum: ['VALID', 'INVALID', 'PENDING'],
        required: true
    }
}, { timestamps: true });

module.exports = model('Ratings_Reviews', ratingsAndReviewsSchema);