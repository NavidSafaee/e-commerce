const { Schema, model } = require('mongoose');

const userDiscountSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    // expiration: {
    //     type: Date,
    //     required: true
    // },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
},{
    timestamps: true
});

userDiscountSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });


module.exports = model('user Discount', userDiscountSchema);