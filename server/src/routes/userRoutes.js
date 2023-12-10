const express = require('express');

const router = express.Router();

const { 
    httpGetMe,
    httpChangePersonalInfo,
} = require('../controllers/userController');
const { changePersonalInfoValidator } = require('../middlewares/validators/userValidator');
const { isAuth } = require('../middlewares/auth');

router.get('/me', isAuth, httpGetMe);
router.patch('/me', isAuth, changePersonalInfoValidator, httpChangePersonalInfo);

module.exports = router;