const jwt = require('jsonwebtoken');
const RevokedToken = require('../models/revokedTokenModel');

async function isAuth(req, res, next) {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new Error('Authorization header must be provided');
        }

        const token = authHeader.split(' ')[1];

        const revokedToken = await RevokedToken.findOne({ token });
        if (revokedToken) {
            throw new Error("token revoked");
        }

        const { sub } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = sub;
        next();

    } catch (error) {
        error.statusCode = 401;
        return next(error);
    }
}

module.exports = isAuth;