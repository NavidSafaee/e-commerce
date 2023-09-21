const express = require('express');

const router = express.Router();

const { httpGetUser } = require('../controllers/userController');
const isAuth = require('../middlewares/isAuth');

router.get('/user', isAuth, httpGetUser);

module.exports = router;