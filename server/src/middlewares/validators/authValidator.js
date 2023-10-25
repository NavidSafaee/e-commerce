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
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('User with this email already exists');
            }
            return true;
        }),

    body('password', 'The password must be at least 5 characters')
        .trim()
        .isLength({ min: 5 }),

    body('phoneNumber', 'Please enter a valid phone number')
        .isMobilePhone()
        .isLength({ min: 11, max: 11 })
        .custom((value) => {
            if (!value.startsWith('09')) {
                throw new Error('phone number should start with 09')
            }
            return true;
        }),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true; 
        })
];


const loginValidator = [
    body('email', 'Please enter a valid email')
        .isEmail()
        .normalizeEmail(),

    body('password', 'The password must be at least 5 characters')
        .isLength({ min: 5 })
];

const forgotPasswordValidator = [
    body('email', 'Please enter a valid email')
    .isEmail()
    .normalizeEmail(),
];

const resetPasswordValidator = [
    body('token', 'reset password token must be provided')
    .trim()
    .not()
    .isEmpty(),

    body('password', 'The password must be at least 5 characters')
    .trim()
    .isLength({ min: 5 }),
    
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true; 
        })
];


module.exports = {
    signupValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator
}
