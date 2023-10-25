const { validationResult } = require('express-validator');

const {
    signup,
    login,
    logout,
    emailPasswordResetLink,
    resetPassword,
    verifyResetPasswordToken,
} = require('../services/authService');

async function httpSignup(req, res, next) {
    try {
        validationCheck(req);

        const response = await signup(req.body);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpLogin(req, res, next) {
    try {
        validationCheck(req);

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
        res.status(201).json({message: 'revoked successfully'});
    } catch (error) {
        next(error);
    }
}

async function httpEmailPasswordResetLink(req, res, next) {
    try {
        validationCheck(req);
        await emailPasswordResetLink(req.body.email);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function httpVerifyResetPasswordToken(req, res, next) {
    try {
        const token = req.body.token;
        if (!token) {
            const error = new Error('reset password token must be provided');
            error.statusCode = 400;
            throw error;
        }
        const userId = await verifyResetPasswordToken(token);
        res.sendStatus(204);
        return userId;
    } catch (error) {
        next(error);
    }
}

async function httpResetPassword(req, res, next) {
    try {
        validationCheck(req);

        const token = req.body.token;
        const userId = await verifyResetPasswordToken(token);
        await resetPassword(userId, req.body);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

function validationCheck(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    }
}


module.exports = {
    httpSignup,
    httpLogin,
    httpEmailPasswordResetLink,
    httpLogout,
    httpVerifyResetPasswordToken,
    httpResetPassword
}