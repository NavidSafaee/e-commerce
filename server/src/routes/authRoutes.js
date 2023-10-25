const express = require('express');

const router = express.Router();

const {
    httpSignup,
    httpLogin,
    httpLogout,
    httpEmailPasswordResetLink,
    httpVerifyResetPasswordToken,
    httpResetPassword
} = require('../controllers/authController');

const {
    signupValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../middlewares/validators/authValidator');
  
const isAuth = require('../middlewares/isAuth');

router.post('/signup', signupValidator, httpSignup);
router.post('/login', loginValidator, httpLogin);
router.post('/logout', isAuth, httpLogout);
router.post('/forgot-password', forgotPasswordValidator, httpEmailPasswordResetLink);
router.post('/reset-password/verify-reset-password-token', httpVerifyResetPasswordToken);
router.patch('/reset-password', resetPasswordValidator, httpResetPassword);


module.exports = router;