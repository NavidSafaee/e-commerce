const { body } = require('express-validator');

const productService = require('../../services/productServices');

const createValidator = [
    body('productId').custom(async (value, { req }) => {
        await productService.getProductById(value);
        return true;
    })
];


module.exports = {
    createValidator
}