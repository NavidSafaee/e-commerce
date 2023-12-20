const express = require('express');
const multer = require('multer');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById,
    httpGetAllProductCount,
    httpEditProduct
} = require('../controllers/productController');
const { fileFilter, fileStorage } = require('../utils/multer');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { createOrEditProductValidator } = require('../middlewares/validators/productValidator');


const router = express.Router();



router.get('/', httpGetAllProducts);
router.get('/count', isAuth, isAdmin, httpGetAllProductCount);
router.get('/:productId', httpGetProductById);
router.post('/', isAuth, isAdmin, multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 10), createOrEditProductValidator, httpCreateProduct);
router.patch('/:productId', isAuth, isAdmin, createOrEditProductValidator, httpEditProduct);

module.exports = router;