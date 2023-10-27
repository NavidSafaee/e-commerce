const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    refreshTokens: [{
        token: {
            type: String,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true,
        }
    }]
});

userSchema.methods.toJSON = function () {
    var userObj = this.toObject();
    delete userObj.password;
    delete userObj.refreshTokens;
    return userObj;
}

module.exports = model('User', userSchema);