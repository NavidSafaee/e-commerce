const express = require('express');

const router = express.Router();

const {
    httpSignup,
    httpLogin,
    httpLogout,
    sendResetPasswordLink,
    httpVerifyResetPasswordToken,
    httpResetPassword,
    httpRefreshToken,
    httpVerifyEmailOrPhoneNumber
} = require('../controllers/authController');

const {
    signupValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    tokenValidator,
    contactValidator
} = require('../middlewares/validators/authValidator');
  
const isAuth = require('../middlewares/isAuth');

router.post('/signup', signupValidator, httpSignup);
router.post('/login', loginValidator, httpLogin);
router.post('/logout', isAuth, httpLogout);
router.post('/forgot-password', forgotPasswordValidator, sendResetPasswordLink);
router.post('/reset-password/token-verification', tokenValidator, httpVerifyResetPasswordToken);
router.patch('/reset-password', resetPasswordValidator, httpResetPassword);
router.post('/refresh-token', tokenValidator, httpRefreshToken);
router.post('/contact-verification', contactValidator, httpVerifyEmailOrPhoneNumber);



module.exports = router;