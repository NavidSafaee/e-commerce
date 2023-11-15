const User = require('../models/userModel');

async function getUser(userId) {
    let user = await User.findById(userId);
    if (!user) {
        const error = new Error();
        error.statusCode = 404;
        throw error;
    }
    return user.toJSON();
}



module.exports = {
    getUser
}