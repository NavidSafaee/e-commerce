const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
    return jwt.sign(
        {},
        process.env.ACCESS_TOKEN_SECRET,
        {
            subject: userId,
            expiresIn: '30m'
        }
    );
}

function generateRefreshToken(userId) {
    return jwt.sign(
        {},
        process.env.REFRESH_TOKEN_SECRET,
        {
            subject: userId,
            expiresIn: '1y'
        }
    );
}

function generateResetPasswordToken(userId) {
    return jwt.sign(
        {},
        process.env.RESET_PASSWORD_TOKEN_SECRET,
        {
            subject: userId,
            expiresIn: '24h'
        }
    );
}




module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken
};