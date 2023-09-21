const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', httpGetAllProducts);

// api test
router.post('/product', httpCreateProduct);


module.exports = router;