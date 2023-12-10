const express = require('express');

const {
    httpPostOrder,
    httpGetOrders,
    httpChangeReceivedState,
    // httpGetUserOrders
} = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { 
    postOrderValidator,
} = require('../middlewares/validators/ordersValidator');

const router = express.Router();

router.get('/', isAuth, httpGetOrders);
router.post('/', isAuth, postOrderValidator, httpPostOrder);
// router.get('/:userId', isAuth, httpGetUserOrders);
router.put('/:orderId/received', isAuth, isAdmin, httpChangeReceivedState);

module.exports = router;
