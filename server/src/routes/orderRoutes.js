const express = require('express');

const {
    httpPostOrder,
    httpGetOrders,
    httpChangeReceivedState
} = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { 
    postOrderValidator,
    changeReceivedStateValidator 
} = require('../middlewares/validators/ordersValidator');

const router = express.Router();

router.get('/', isAuth, httpGetOrders);
router.post('/', isAuth, postOrderValidator, httpPostOrder);
router.put('/:orderId/received', isAuth, isAdmin, httpChangeReceivedState);

module.exports = router;
