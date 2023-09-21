const express = require('express');

const router = express.Router();

const {
    httpGetCart,
    httpAddToCart
} = require('../controllers/cartController');

const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, httpGetCart);
router.put('/', isAuth, httpAddToCart);



module.exports = router;