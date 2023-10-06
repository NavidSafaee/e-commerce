const jwt = require('jsonwebtoken');

function createJWT(user) {
    return jwt.sign(
        { userId: user._id.toString(), email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
}


module.exports = createJWT;