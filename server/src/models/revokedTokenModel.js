const { model, Schema } = require('mongoose');

const revokedTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

revokedTokenSchema.index({createdAt: 1}, {expireAfterSeconds: 1800});

module.exports = model('Revoked token', revokedTokenSchema);