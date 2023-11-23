const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById
} = require('../controllers/productController');

// const { isAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', httpGetAllProducts);
router.get('/:productId', httpGetProductById);

// will be removed
router.post('/', httpCreateProduct);


module.exports = router;