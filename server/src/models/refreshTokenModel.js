const { model, Schema } = require('mongoose');

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });


module.exports = model('Refresh token', refreshTokenSchema);    