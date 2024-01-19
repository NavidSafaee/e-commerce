const express = require('express');
const { isAuth, isCustomer } = require('../middlewares/auth');

const { httpGetDiscountPercentage } = require('../controllers/userDiscountController');

const router = express.Router();

router.get('/:discountCode/percentage', isAuth, isCustomer, httpGetDiscountPercentage);


module.exports = router;


