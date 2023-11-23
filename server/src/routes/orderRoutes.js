const express = require('express');

const {
    httpPostOrder,
    httpGetOrder
} = require('../controllers/orderController');
const { isAuth } = require('../middlewares/auth');
const { postOrderValidator } = require('../middlewares/validators/ordersValidator');

const router = express.Router();

router.get('/', isAuth, httpGetOrder);
router.post('/', isAuth, postOrderValidator, httpPostOrder);

module.exports = router;
