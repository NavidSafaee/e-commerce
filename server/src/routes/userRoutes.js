const express = require('express');

const router = express.Router();

const { httpGetUser } = require('../controllers/userController');
const { isAuth } = require('../middlewares/auth');

router.get('/me', isAuth, httpGetUser);

module.exports = router;