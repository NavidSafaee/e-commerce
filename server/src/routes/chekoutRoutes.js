const express = require('express');

const { httpCreateCheckoutSessionId } = require('../controllers/checkoutController');
const { isAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/sessionId', isAuth, isAdmin, httpCreateCheckoutSessionId);


module.exports = router;