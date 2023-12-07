const User = require('../models/userModel');

async function getMe(userId) {
    let user = await User.findById(userId);
    return user.toJSON();
}



module.exports = {
    getMe
}