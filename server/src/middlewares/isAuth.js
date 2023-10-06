const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
    let decodedToken;
    
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new Error('Authorization header must be provided');
        }

        const token = authHeader.split(' ')[1];
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}

module.exports = isAuth;