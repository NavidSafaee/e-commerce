const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById
} = require('../controllers/productController');

const router = express.Router();

router.get('/', httpGetAllProducts);
router.get('/:productId', httpGetProductById);

// will be removed
router.post('/', httpCreateProduct);


module.exports = router;