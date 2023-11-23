const User = require('../models/userModel');

async function getUser(userId) {
    let user = await User.findById(userId);
    return user.toJSON();
}



module.exports = {
    getUser
}