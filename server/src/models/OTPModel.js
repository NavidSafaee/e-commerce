const { Schema, model } = require('mongoose');

const OTPSchema = new Schema({
    OTP: {
        type: String,
        required: true
    },

    contactInfo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

module.exports = model('OTP', OTPSchema);