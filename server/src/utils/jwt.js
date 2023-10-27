const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

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

async function generateRefreshToken(userId) {
    const refreshToken = jwt.sign(
        {},
        process.env.REFRESH_TOKEN_SECRET,
        {
            subject: userId,
            expiresIn: '1y'
        }
    );

    // const aYearFromNow = new Date();
    // aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    const {exp} = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(userId);
    user.refreshTokens.push({ token: refreshToken, expirationDate: exp + '000' });
    await user.save();

    return refreshToken;
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