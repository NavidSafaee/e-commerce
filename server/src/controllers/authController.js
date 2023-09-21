const { validationResult } = require('express-validator');

const {
    signup,
    login
} = require('../services/authService');

async function httpSignup(req, res, next) {
    try {
        validationCheck(req);

        await signup(req.body);
        res.status(201).json({ message: 'user created successfully' });
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

function validationCheck(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}


module.exports = {
    httpSignup,
    httpLogin
}