const { body, oneOf } = require('express-validator');


const addToCartValidator = [
    body('productId', 'Product id must be provided')
        .trim()
        .notEmpty()
];


module.exports = {
    addToCartValidator
}
