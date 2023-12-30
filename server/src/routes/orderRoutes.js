const express = require('express');

const {
    httpPostOrder,
    httpGetCustomerOrders,
    httpChangeDeliveryState,
    httpGetMyOrders,
    httpGetCustomerDeliveredOrdersCount,
    httpGetLastMonthDeliveredOrders
} = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { 
    postOrderValidator,
} = require('../middlewares/validators/ordersValidator');

const router = express.Router();

router.post('/', isAuth, postOrderValidator, httpPostOrder);
router.get('/me', isAuth, httpGetMyOrders);
router.get('/customer', isAuth, isAdmin, httpGetCustomerOrders);
router.put('/:orderId/delivered', isAuth, isAdmin, httpChangeDeliveryState);
router.get('/customer/delivered/count', isAuth, isAdmin, httpGetCustomerDeliveredOrdersCount);
router.get('/customer/delivered/lastMonth', isAuth, isAdmin, httpGetLastMonthDeliveredOrders);

module.exports = router;
