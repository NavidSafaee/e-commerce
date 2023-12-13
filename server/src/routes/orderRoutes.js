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
router.get('/customer', isAuth, httpGetCustomerOrders);
router.put('/admin/:orderId/delivered', isAuth, httpChangeDeliveryState);
router.get('/customer/delivered/count', isAuth, isAdmin, httpGetCustomerDeliveredOrdersCount);
router.get('/customer/delivered/lastMonth', isAuth, isAdmin, httpGetLastMonthDeliveredOrders);

module.exports = router;
