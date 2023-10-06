const User = require('../models/userModel');

async function getUser(userId) {
    const user = await User.findById(userId);
    return user;
}



module.exports = {
    getUser
}