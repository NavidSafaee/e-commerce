const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
    let decodedToken;
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new Error('unAuthorized');
        }

        const token = authHeader.split(' ')[1];

        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new Error('unAuthorized');
        }
    } catch (error) {
        error.statusCode = 401;
        return next(error);
    }

    req.userId = decodedToken.userId;
    next();
}

module.exports = isAuth;