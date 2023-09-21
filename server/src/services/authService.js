const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

async function signup(reqBody) {
    const {
        username,
        email,
        password
    } = reqBody;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: hashedPassword
    });

    await user.save();
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
            const token = jwt.sign(
                { userId: user._id.toString(), email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            )
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