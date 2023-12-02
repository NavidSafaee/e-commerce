const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

function generateAccessToken(userId, role) {
    return jwt.sign(
        { role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            subject: userId,
            expiresIn: '1m'
        }
    );
}


function generateRefreshToken(userId, role) {
    return jwt.sign(
        { role },
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

async function generateTokens(userId, role) {
    const accessToken = generateAccessToken(userId, role);
    const refreshToken = generateRefreshToken(userId, role);

    const { exp } = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(userId);
    user.tokens.push({ accessToken, refreshToken, refreshTokenExpiration: exp + '000' });
    await user.save();

    return { accessToken, refreshToken }
}


module.exports = {
    generateTokens,
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken
};