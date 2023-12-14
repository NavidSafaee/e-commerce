const express = require('express');

const router = express.Router();

const {
    httpGetMyCart,
    httpAddToCart,
    httpDeleteFromCart,
    httpChangeCartItemQuantity,
    httpGetCartItemQuantity
} = require('../controllers/cartController');

const { changeCartItemQuantityValidator } = require('../middlewares/validators/cartValidator');

const { isAuth, isCustomer } = require('../middlewares/auth');

router.get('/me', isAuth, isCustomer, httpGetMyCart);
router.put('/me/items/:productId', isAuth, isCustomer, httpAddToCart);
router.delete('/me/items/:productId', isAuth, isCustomer, httpDeleteFromCart);
router.put('/me/items/:productId/quantity', isAuth, isCustomer, changeCartItemQuantityValidator, httpChangeCartItemQuantity);
router.get('/me/items/:productId/quantity', isAuth, isCustomer, httpGetCartItemQuantity);


module.exports = router;