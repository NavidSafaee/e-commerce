const bcrypt = require('bcryptjs');

const createJWT = require('../utils/jwt');
const User = require('../models/userModel');

async function signup(reqBody) {
    const {
        username,
        email,
        phoneNumber,
        password
    } = reqBody;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber
    });

    await user.save();
    return {username, email, phoneNumber};
}

async function login(reqBody) {
    const {
        email,
        password
    } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            const token = createJWT(user);
            return {
                token
            }
        }
    }
    
    const error = new Error('wrong email or password');
    error.statusCode = 401;
    throw error;
}


module.exports = {
    signup,
    login
}