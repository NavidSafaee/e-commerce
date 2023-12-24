const express = require('express');

const router = express.Router();

const { 
    httpGetMe,
    httpChangePersonalInfo,
    httpGetCustomersCount,
    httpGetUsers,
    httpSignupUser
} = require('../controllers/userController');
const { changePersonalInfoValidator, getUsersValidator } = require('../middlewares/validators/userValidator');
const { signupValidator } = require('../middlewares/validators/authValidator');
const { isAuth, isAdmin } = require('../middlewares/auth');

router.get('/', isAuth, isAdmin, getUsersValidator, httpGetUsers);
router.post('/', isAuth, isAdmin, signupValidator, httpSignupUser);
router.get('/me', isAuth, httpGetMe);
router.patch('/me', isAuth, changePersonalInfoValidator, httpChangePersonalInfo);
router.get('/customers/count', isAuth, isAdmin, httpGetCustomersCount);

module.exports = router;