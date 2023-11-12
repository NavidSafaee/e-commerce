const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const {
    generateTokens,
    generateAccessToken,
    generateRefreshToken,
    generateResetPasswordToken
} = require('../utils/jwt');
const User = require('../models/userModel');
const OTP = require('../models/OTPModel');
const RevokedToken = require('../models/revokedTokenModel');
const sendSms = require('../utils/sms');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'softlaand@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


async function signup(reqBody) {
    const {
        username,
        email,
        phoneNumber,
        password,
        OTP: otp
    } = reqBody;

    // const hashedOTP = await bcrypt.hash(otp, 12);
    const contactInfo = email || phoneNumber;

    const OTPDoc = await OTP.findOne({ contactInfo });

    if (!OTPDoc || !(await bcrypt.compare(otp, OTPDoc.OTP))) {
        const error = new Error('wrong OTP');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber
    });


    await user.save();
    // const accessToken = generateAccessToken(user._id.toString());
    // const refreshToken = await generateRefreshToken(user._id.toString());
    const { accessToken, refreshToken } = await generateTokens(user._id.toString());

    return {
        accessToken,
        refreshToken,
        user: user.toJSON()
    }
}

async function login(reqBody) {
    const {
        email,
        phoneNumber,
        OTP: otp,
        password
    } = reqBody;

    if (password) {
        let user;
        if (email) user = await User.findOne({ email });
        else if (phoneNumber) user = await User.findOne({ phoneNumber });

        if (user) {
            const doMatch = await bcrypt.compare(password, user.password);

            if (doMatch) {
                // const accessToken = generateAccessToken(user._id.toString());
                // const refreshToken = await generateRefreshToken(user._id.toString());

                return await generateTokens(user._id.toString());
            }
        }

        const error = new Error('wrong email or password');
        error.statusCode = 401;
        throw error;

    } else if (otp) {
        const contactInfo = email || phoneNumber;
        const OTPDoc = await OTP.findOne({ contactInfo });

        if (OTPDoc) {
            const doMatch = await bcrypt.compare(otp, OTPDoc.OTP);

            if (doMatch) {
                let user;
                if (email) user = await User.findOne({ email });
                else if (phoneNumber) user = await User.findOne({ phoneNumber });

                // const accessToken = generateAccessToken(user._id.toString());
                // const refreshToken = await generateRefreshToken(user._id.toString());

                // return { accessToken, refreshToken }
                return await generateTokens(user._id.toString());
            }
        }

        const error = new Error('wrong OTP');
        error.statusCode = 401;
        throw error;
    }
}

async function logout(token) {
    const { sub: userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findById(userId);
    user.tokens = user.tokens.filter(tokenObj => tokenObj.accessToken !== token);
    await user.save();

    await revokeToken(token);
}

async function emailResetPasswordLink(email) {
    const user = await User.findOne({ email });

    const token = generateResetPasswordToken(user._id.toString());
    
    const encodedToken = Buffer.from(token).toString('base64');
    console.log(encodedToken);
    const htmlFile = fs.readFileSync(path.join(__dirname, '..', 'views', 'resetPassword-email.ejs'));
    const renderedHtml = ejs.render(String(htmlFile), { username: user.username, token: encodedToken });

    transporter.sendMail({
        from: 'softlaand@gmail.com',
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

async function smsResetPasswordLink(phoneNumber) {

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
        const { sub: userId } = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);

        const revokedToken = await RevokedToken.findOne({ token });
        if (revokedToken) {
            throw new Error("token revoked");
        }

        return userId;
        
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
}


//test changed logic
async function refreshToken(refreshToken) {

    const { sub: userId } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: userId, 'tokens.refreshToken': refreshToken });


    if (!user) {
        const user = await User.findById(userId);
        user.tokens = [];
        await user.save();

        const error = new Error('refresh token revoked');
        error.statusCode = 401;
        throw error;
    } else {
        user.tokens = user.tokens.filter(tokenObj => tokenObj.refreshToken !== refreshToken);
        await user.save();
``
        return await generateTokens(userId);
    }
}

async function revokeToken(token) {
    const revokedToken = new RevokedToken({
        token,
    });
    await revokedToken.save();
}


async function verifyEmail(email) {

    const oneTimePassword = generateOTP();
    const hashedOTP = await bcrypt.hash(oneTimePassword, 12);

    const otp = new OTP({
        OTP: hashedOTP,
        contactInfo: email
    });

    await otp.save();

    const htmlFile = fs.readFileSync(path.join(__dirname, '..', 'views', 'verification-email.ejs'));
    const renderedHtml = ejs.render(String(htmlFile), { OTP: oneTimePassword });

    transporter.sendMail({
        from: 'softlaand@gmail.com',
        to: email,
        subject: 'verify your new Softland account',
        html: renderedHtml,
        attachments: [{
            filename: 'pastel-green-logo.png',
            path: path.join(__dirname, '..', '..', 'public', 'images', 'reset-password', 'pastel-green-logo.png'),
            cid: 'logo'
        }]
    });
}


async function verifyPhoneNumber(phoneNumber) {
    const oneTimePassword = generateOTP();
    const hashedOTP = await bcrypt.hash(oneTimePassword, 12);
    const otp = new OTP({
        OTP: hashedOTP,
        contactInfo: phoneNumber
    });
    await otp.save();

    sendSms(173012, phoneNumber, oneTimePassword);
}

function generateOTP() {
    const randomInt = Date.now().toString() + crypto.randomInt(10000, 100000000).toString();
    let hashedRandomInt = crypto.createHash('md5').update(randomInt).digest("hex");
    return hashedRandomInt.slice(0, 6);
}


module.exports = {
    signup,
    login,
    logout,
    emailResetPasswordLink,
    smsResetPasswordLink,
    verifyResetPasswordToken,
    resetPassword,
    refreshToken,
    verifyEmail,
    verifyPhoneNumber
}