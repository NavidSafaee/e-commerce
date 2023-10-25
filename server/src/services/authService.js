const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: true,
    auth: {
        user: 'softlaand@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const {
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken
} = require('../utils/jwt');
const User = require('../models/userModel');
const RevokedToken = require('../models/revokedTokenModel');

async function signup(reqBody) {
    const {
        username,
        email,
        phoneNumber,
        password
    } = reqBody;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber
    });
    await user.save();

    const token = generateAccessToken(user._id.toString());
    return {
        token,
        user: user.toJSON()
    }
}

async function login(reqBody) {
    const {
        email,
        password
    } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            const token = generateAccessToken(user._id.toString());
            return {
                token
            }
        }
    }
    
    const error = new Error('wrong email or password');
    error.statusCode = 401;
    throw error;
}

async function logout(token) {
    await revokeToken(token);
}

async function emailPasswordResetLink(email) {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
    }

    const token = generateResetPasswordToken(user._id.toString());
    console.log(token);

    const encodedToken = Buffer.from(token, 'utf-8').toString('base64');
    const htmlFile = fs.readFileSync(path.join(__dirname, '..', 'views', 'index.ejs'));
    const renderedHtml = ejs.render(String(htmlFile), { username: user.username, token: encodedToken });

    transporter.sendMail({
        from: 'navid.safaee1381@gmail.com',
        to: email,
        subject: 'reset password',
        html: renderedHtml,
        attachments: [{
            filename: 'pastel-green-logo.png',
            path: path.join(__dirname, '..', '..', 'public', 'images', 'reset-password', 'pastel-green-logo.png'),
            cid: 'logo'
        }]
    });
}

async function resetPassword(userId, reqBody) {
    const { password, token } = reqBody;

    const user = await User.findById(userId);
    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    await user.save();

    await revokeToken(token);
}


async function verifyResetPasswordToken(token) {
    try {
        const revokedToken = await RevokedToken.findOne({ token });
        if (revokedToken) {
            throw new Error("token revoked");
        }
        const { sub: userId } = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
        return userId;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}


async function revokeToken(token) {
    try {
        const { exp } = jwt.decode(token);

        const revokedToken = new RevokedToken({
            token,
        });

        await revokedToken.save();
    } catch (error) {
        throw (error);
    }
}


module.exports = {
    signup,
    login,
    logout,
    emailPasswordResetLink,
    verifyResetPasswordToken,
    resetPassword
}