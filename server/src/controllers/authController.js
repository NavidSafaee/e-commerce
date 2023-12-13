const validator = require('../utils/validator');
const {
    signup,
    login,
    logout,
    emailResetPasswordLink,
    smsResetPasswordLink,
    resetPassword,
    verifyResetPasswordToken,
    refreshToken,
    verifyEmail,
    verifyPhoneNumber
} = require('../services/authService');


async function httpSignup(req, res, next) {
    try {
        validator(req);

        const response = await signup(req);
        res.status(201).json(response);

    } catch (error) {
        next(error);
    }
}


async function httpLogin(req, res, next) {
    try {
        validator(req);

        const result = await login(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function httpLogout(req, res, next) {
    try {
        const token = req.get('Authorization').split(' ')[1];
        await logout(token);
        res.status(201).json({ message: 'logged out successfully' });

    } catch (error) {
        next(error);
    }
}

async function sendResetPasswordLink(req, res, next) {
    try {
        validator(req);
        const { email, phoneNumber } = req.body;

        if (email) {
            await emailResetPasswordLink(req.body.email);
            return res.sendStatus(204);

        } else if (phoneNumber) {
            await smsResetPasswordLink(req.body.phoneNumber);
            return res.sendStatus(204);
        }

    } catch (error) {
        next(error);
    }
}

async function httpVerifyResetPasswordToken(req, res, next) {
    try {
        const token = Buffer.from(req.body.token, 'base64').toString()

        await verifyResetPasswordToken(token);
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

async function httpResetPassword(req, res, next) {
    try {
        validator(req);

        req.body.token = Buffer.from(req.body.token, 'base64').toString();
        const userId = await verifyResetPasswordToken(req.body.token);
        await resetPassword(userId, req.body);

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

async function httpRefreshToken(req, res, next) {
    try {
        validator(req);
        const token = req.body.token;
        const tokensObj = await refreshToken(token);
        res.status(200).json(tokensObj);

    } catch (error) {
        next(error);
    }
}

async function httpVerifyEmailOrPhoneNumber(req, res, next) {
    try {
        validator(req);
        const { email, phoneNumber } = req.body;

        if (email) {
            await verifyEmail(req.body.email);
            return res.sendStatus(204);

        } else if (phoneNumber) {
            await verifyPhoneNumber(req.body.phoneNumber);
            return res.sendStatus(204);
        }

    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpSignup,
    httpLogin,
    sendResetPasswordLink,
    httpLogout,
    httpVerifyResetPasswordToken,
    httpResetPassword,
    httpRefreshToken,
    httpVerifyEmailOrPhoneNumber
}