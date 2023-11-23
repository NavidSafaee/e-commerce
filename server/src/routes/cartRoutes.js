const express = require('express');

const router = express.Router();

const {
    httpGetCart,
    httpAddToCart
} = require('../controllers/cartController');

const { addToCartValidator } = require('../middlewares/validators/cartValidator');

const { isAuth, isCustomer } = require('../middlewares/auth');

router.get('/', isAuth, isCustomer, httpGetCart);
router.put('/', isAuth, isCustomer, addToCartValidator, httpAddToCart);


module.exports = router;