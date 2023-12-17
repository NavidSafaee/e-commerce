const jwt = require('jsonwebtoken');
const RevokedToken = require('../models/revokedTokenModel');

async function isAuth(req, res, next) {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new Error('Authorization header must be provided');
        }

        const token = authHeader.split(' ')[1];

        const { sub, role } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const revokedToken = await RevokedToken.findOne({ token });
        if (revokedToken) {
            throw new Error("Token revoked");
        }

        req.userId = sub;
        req.role = role;
        next();

    } catch (error) {
        error.statusCode = 401;
        return next(error);
    }
}

async function isAdmin(req, res, next) {
    try {
        if (req.role !== 'ADMIN') {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
}

function isCustomer(req, res, next) {

    try {
        if (req.role !== 'CUSTOMER') {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    isAuth,
    isAdmin,
    isCustomer
};