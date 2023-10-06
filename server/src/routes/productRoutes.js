const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', httpGetAllProducts);
router.get('/:productId', httpGetProduct);

// will be removed
router.post('/', httpCreateProduct);


module.exports = router;