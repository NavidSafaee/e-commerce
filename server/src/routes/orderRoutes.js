const express = require('express');

const { 
    httpPostOrder,
    httpGetOrder
} = require('../controllers/orderController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, httpGetOrder);
router.post('/', isAuth, httpPostOrder);

module.exports = router;
