const express = require('express');

const {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById
} = require('../controllers/productController');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { postProductValidator } = require('../middlewares/validators/productValidator');


const router = express.Router();

router.get('/', httpGetAllProducts);
router.get('/:productId', httpGetProductById);
// multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 10),
// isAuth, isAdmin,
router.post('/', postProductValidator, httpCreateProduct);


// will be removed
// router.post('/', httpCreateProduct);


module.exports = router;