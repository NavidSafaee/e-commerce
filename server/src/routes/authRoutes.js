const express = require('express');

const router = express.Router();

const {
    httpSignup,
    httpLogin
} = require('../controllers/authController');

const {
    signupValidator,
    loginValidator
} = require('../middlewares/validators/authValidator');
  


router.post('/signup', signupValidator, httpSignup);
router.post('/login', loginValidator, httpLogin);


module.exports = router;