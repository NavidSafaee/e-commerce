const { body } = require('express-validator');
const User = require('../../models/userModel');

const signupValidator = [
    body('username', 'Username should not be empty')
        .trim()
        .not()
        .isEmpty(),

    body('email', 'Please enter a valid email')
        .isEmail()
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('User with this email already exists');
            }
            return true;
        }),

    body('password', 'The password must be at least 5 characters')
        .trim()
        .isLength({ min: 5 }),
];


const loginValidator = [
    body('email', 'Please enter a valid email')
        .isEmail()
        .normalizeEmail(),

    body('password', 'The password must be at least 5 characters')
        .isLength({ min: 5 })
];


module.exports = {
    signupValidator,
    loginValidator
}
