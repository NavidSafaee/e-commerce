const express = require('express');

const router = express.Router();

const { httpGetMe } = require('../controllers/userController');
const { isAuth } = require('../middlewares/auth');

router.get('/me', isAuth, httpGetMe);

module.exports = router;