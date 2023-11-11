const { body, re, oneOf } = require('express-validator');
const User = require('../../models/userModel');


const emailOrPhoneNumberValidator = [
    body('email', 'please enter a valid email or phoneNumber')
        .if(body('phoneNumber').not().exists())
        .isEmail(),
        // .normalizeEmail(),

    body('phoneNumber', 'please enter a valid email or phoneNumber')
        .if(body('email').not().exists())
        .isMobilePhone()
        .isLength({ min: 11, max: 11 })
        .custom((value) => {
            if (!value.startsWith('09')) {
                throw new Error('phone number should start with 09')
            }
            return true;
        })
];



const existingAccountValidator = [
    body('email')
        .if(body('phoneNumber').not().exists())
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                throw new Error('no account found for this email')
            }
            return true;
        }),

    body('phoneNumber')
        .if(body('email').not().exists())
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                throw new Error('no account found for this phone number')
            }
            return true;
        }),
];


const signupValidator = [
    body().custom((value, { req }) => {
        if (Object.keys(req.body).length !== 5 &&
            (Object.keys(req.body).length !== 4)) {
            throw new Error('Bad Request');
        }
        return true;
    }),

    body('username', 'Username should not be empty')
        .trim()
        .not()
        .isEmpty(),

    body('password', 'The password must be at least 6 characters')
        .trim()
        .isLength({ min: 6 }),

    body('confirmPassword', 'The password must be at least 6 characters')
        .trim()
        .isLength({min: 6})
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        }),

    ...emailOrPhoneNumberValidator,

    body('email')
        .if(body('phoneNumber').not().exists())
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('there\'s Already an account with this email')
            }
            return true;
        }),

    body('phoneNumber')
        .if(body('email').not().exists())
        .exists()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ phoneNumber: value });
            if (user) {
                throw new Error('there\'s Already an account with this phone number')
            }
            return true;
        }),

    body('OTP', 'please enter a valid OTP')
        .if((value, { req }) => req.url === '/signup')
        .isLength({ min: 6, max: 6 }),

];



const loginValidator = [
    body().custom((value, { req }) => {

        if (Object.keys(req.body).length !== 2 &&
            (Object.keys(req.body).length !== 1)) {
            throw new Error('Bad Request');
        }
        return true;
    }),

    ...emailOrPhoneNumberValidator,
    ...existingAccountValidator,

    body('password', 'invalid password or OTP')
        .if((value, { req }) => req.url === '/login')
        .if(body('OTP').not().exists())
        .isLength({ min: 6 }),

    body('OTP', 'invalid password or OTP')
        .if((value, { req }) => req.url === '/login')
        .if(body('password').not().exists())
        .isLength({ min: 6, max: 6 }),
];



const forgotPasswordValidator = [
    body().custom((value, { req }) => {
        if (Object.keys(req.body).length !== 1) {
            throw new Error('Bad Request');
        }
        return true;
    }),
    ...emailOrPhoneNumberValidator,
    ...existingAccountValidator
];

const tokenValidator = [
    body('token', 'token must be provided')
        .trim()
        .notEmpty(),
]

const resetPasswordValidator = [
    ...tokenValidator,

    body('password', 'The password must be at least 6 characters')
        .trim()
        .isLength({ min: 6 }),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match');
            }
            return true;
        })
];

const contactValidator = [

    body().custom((value, { req }) => {
        if (Object.keys(req.body).length !== 1 && Object.keys(req.body).length !== 4) {
            throw new Error('Bad Request');
        }
        return true;
    }),

    oneOf([
        signupValidator,
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length !== 4) {
                return true;
            }
        })
    ]),

    oneOf([
        loginValidator,
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length !== 1) {
                return true;
            }
        })
    ])
];


module.exports = {
    signupValidator,
    loginValidator,
    forgotPasswordValidator,
    tokenValidator,
    resetPasswordValidator,
    contactValidator,
}
