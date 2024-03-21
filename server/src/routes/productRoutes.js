const express = require('express');
const multer = require('multer');


const productController = require('../controllers/productController');
const  productValidator = require('../middlewares/validators/productValidator');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { fileFilter, fileStorage } = require('../utils/multer');


const router = express.Router();

const saveImages = multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 10);

router.get('/', productController.getAll);
router.post('/', isAuth, isAdmin, saveImages, productValidator.createOrEditValidator, productController.create);
router.get('/count', isAuth, isAdmin, productController.getAll);
router.get('/title', productController.getAllTitle);
router.get('/category', productController.getAllCategories);
router.get('/search', productController.search);
router.get('/:productId', productController.getById);
router.patch('/:productId', isAuth, isAdmin, productValidator.createOrEditValidator, productController.update);

module.exports = router;