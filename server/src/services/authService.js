const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const {
    generateTokens,
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


async function signup(req) {
    const {
        userRole,
        username,
        email,
        phoneNumber,
        password,
        OTP: otp
    } = req.body;

    let role = "CUSTOMER"
    if (await User.countDocuments() === 0) role = "ADMIN"
    if (req.role === 'ADMIN') role = userRole;

    const contactInfo = email || phoneNumber;

    // const OTPDoc = await OTP.findOne({ contactInfo });

    const OTPDocs = await OTP.find({ contactInfo });

    if (OTPDocs.length > 0) {
        const doMatch = await checkMatchingCondition(otp, OTPDocs);
        if (doMatch) {
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                role
            });
            await user.save();

            const { accessToken, refreshToken } = await generateTokens(user._id.toString(), role);

            return {
                accessToken,
                refreshToken,
                user: user.toJSON()
            }
        }
    }

    const error = new Error('Wrong contact info or OTP');
    error.statusCode = 400;
    throw error;

    // if (!OTPDoc || !(await bcrypt.compare(otp, OTPDoc.OTP))) {
    //     const error = new Error('Wrong contact info or OTP');
    //     error.statusCode = 400;
    //     throw error;
    // }

    // const hashedPassword = await bcrypt.hash(password, 12);

    // const user = new User({
    //     username,
    //     email,
    //     password: hashedPassword,
    //     phoneNumber,
    //     role
    // });
    // await user.save();

    // const { accessToken, refreshToken } = await generateTokens(user._id.toString(), role);

    // return {
    //     accessToken,
    //     refreshToken,
    //     user: user.toJSON()
    // }
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

                const { accessToken, refreshToken } = await generateTokens(user._id.toString(), user.role);

                return {
                    accessToken,
                    refreshToken,
                    user: user.toJSON()
                }
            }
        }

        const error = new Error('wrong contact info or password');
        error.statusCode = 401;
        throw error;

    } else if (otp) {
        const contactInfo = email || phoneNumber;
        const OTPDocs = await OTP.find({ contactInfo });

        if (OTPDocs.length > 0) {
            const doMatch = await checkMatchingCondition(otp, OTPDocs);
            if (doMatch) {
                let user;
                if (email) user = await User.findOne({ email });
                else if (phoneNumber) user = await User.findOne({ phoneNumber });

                if (!user) {
                    const error = new Error('User not found');
                    error.statusCode = 404;
                    throw error;
                }

                const { accessToken, refreshToken } = await generateTokens(user._id.toString(), user.role);

                return {
                    accessToken,
                    refreshToken,
                    user: user.toJSON()
                }
            }
        }

        const error = new Error('Wrong contact info or OTP');
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
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
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


async function refreshToken(refreshToken) {
    const { sub: userId, role } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: userId, 'tokens.refreshToken': refreshToken });


    if (!user) {
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        user.tokens = [];
        await user.save();

        const error = new Error('refresh token revoked');
        error.statusCode = 401;
        throw error;
    } else {
        user.tokens = user.tokens.filter(tokenObj => tokenObj.refreshToken !== refreshToken);
        await user.save();
        return await generateTokens(userId, role);
    }
}

async function revokeToken(token) {
    const revokedToken = new RevokedToken({
        token,
    });
    await revokedToken.save();
}


async function verifyEmail(email) {
    const OTP = await generateOTP(email);

    const htmlFile = fs.readFileSync(path.join(__dirname, '..', 'views', 'verification-email.ejs'));
    const renderedHtml = ejs.render(String(htmlFile), { OTP });

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
    const OTP = await generateOTP(phoneNumber);
    sendSms(+process.env.SMS_TEXT_ID, phoneNumber, OTP);
}

async function generateOTP(contactInfo) {
    const randomInt = Date.now().toString() + crypto.randomInt(10000, 100000000).toString();
    let hashedRandomInt = crypto.createHash('md5').update(randomInt).digest("hex");
    const oneTimePassword = hashedRandomInt.slice(0, 6);

    const hashedOTP = await bcrypt.hash(oneTimePassword, 12);
    const otp = new OTP({
        OTP: hashedOTP,
        contactInfo
    });
    await otp.save();

    return oneTimePassword;
}

async function checkMatchingCondition(otp, OTPDocs) {
    for (let OTPDoc of OTPDocs) {
        const comparisonResult = await bcrypt.compare(otp, OTPDoc.OTP);
        if (comparisonResult) {
            return true;
        }
    }
    return false;
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