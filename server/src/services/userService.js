const User = require('../models/userModel');

async function getUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error('user not found!');
        error.statusCode = 404;
        throw error;
    }

    return user;
}



module.exports = {
    getUser
}