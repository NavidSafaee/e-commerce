const { body, oneOf } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/userModel');

const changePersonalInfoValidator = [
    body().custom((value, { req }) => {
        if (req.query.action === 'edit' && Object.keys(req.body).length > 1) throw new Error('Bad Request');
        return true;
    }),


    body('username', 'username should not be empty')
        .if(body('username').exists())
        .trim()
        .notEmpty(),

    body('email', 'please enter a valid email')
        .if(body('email').exists())
        .isEmail()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (user) throw new Error('there\'s Already an account with this email');

            return true;
        }),

    body('phoneNumber', 'please enter a valid phoneNumber')
        .if(body('phoneNumber').exists())
        .isMobilePhone()
        .isLength({ min: 11, max: 11 })
        .custom((value) => {
            if (!value.startsWith('09')) {
                throw new Error('phone number should start with 09')
            }
            return true;
        })
        .custom(async (value, { req }) => {
            const user = await User.findOne({ phoneNumber: value });
            if (user) {
                throw new Error('there\'s Already an account with this phone number')
            }
            return true;
        }),

    body('oldPassword', 'Please insert old password correctly')
        .if(body('newPassword').exists())
        .trim()
        .isLength({ min: 6 })
        .custom(async (value, { req }) => {
            const user = await User.findById(req.userId);

            if (!(await bcrypt.compare(value, user.password))) {
                 throw new Error('Please insert old password correctly');
            }
            return true;
        }),

    body('newPassword', 'The password must be at least 6 characters')
        .if(body('newPassword').exists())
        .trim()
        .isLength({ min: 6 }),

    body('confirmNewPassword', 'Passwords have to match')
        .if(body('newPassword').exists())
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords have to match');
            }
            return true;
        }),

    body('birthDate', 'please enter a valid birth date')
        .if(body('birthDate').exists())
        .isISO8601()
        .toDate()
        .custom((value, { req }) => {
            const birthDate = new Date(value);
            if (birthDate > Date.now()) {
                throw new Error('please enter a valid birth date');
            }
            return true;
        }),

    body('OTP', 'please enter a valid OTP')
        .if((value, { req }) => req.url === '/me')
        .if(body('phoneNumber').exists())
        .isLength({ min: 6, max: 6 }),

    body('OTP', 'please enter a valid OTP')
        .if((value, { req }) => req.url === '/me')
        .if(body('email').exists())
        .isLength({ min: 6, max: 6 })
];

const getUsersValidator = [
    body().custom((value, { req }) => {
        const role = req.query.role;
        if (role !== 'CUSTOMER' && role !== 'ADMIN') throw new Error('invalid role in query');
        return true;
    })
];


module.exports = {
    changePersonalInfoValidator,
    getUsersValidator
}