const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById,
    httpGetAllProductCount,
    httpEditProduct
} = require('../controllers/productController');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { createOrEditProductValidator } = require('../middlewares/validators/productValidator');


const router = express.Router();

// router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 10));

router.get('/', httpGetAllProducts);
router.get('/count', isAuth, isAdmin, httpGetAllProductCount);
router.get('/:productId', httpGetProductById);
router.post('/', isAuth, isAdmin, createOrEditProductValidator, httpCreateProduct);
router.patch('/:productId', isAuth, isAdmin, createOrEditProductValidator, httpEditProduct);

module.exports = router;