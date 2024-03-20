const express = require('express');

const favProductController = require('../controllers/favoriteProductController');
const favProductValidator = require('../middlewares/validators/favoriteProductValidator');
const { isAuth, isCustomer } = require('../middlewares/auth');

const router = express.Router();

router.get('/', isAuth, isCustomer, favProductController.getMe);
router.post('/', isAuth, isCustomer, favProductValidator.createValidator, favProductController.create);
router.delete('/', isAuth, isCustomer, favProductController.remove);


module.exports = router;