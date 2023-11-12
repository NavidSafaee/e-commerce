const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },   
    password: {
        type: String,
        required: true
    },
    email: String,
    phoneNumber: String,
    tokens: [{
        accessToken: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        refreshTokenExpiration: {
            type: Date,
            required: true,
        }
    }]
});

userSchema.methods.toJSON = function () {
    var userObj = this.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
}

module.exports = model('User', userSchema);