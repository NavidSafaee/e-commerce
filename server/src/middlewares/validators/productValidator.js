const { body, oneOf } = require('express-validator');

const postProductValidator = [
    body('title', 'title should not be empty')
        .notEmpty(),


    body('price', 'invalid price')
        .isFloat({ min: 0.01 })
        .isLength({max: 4}),
     
    body('category', 'category should not be empty')
        .notEmpty()
        .custom((value, { req }) => {
            if (!['CHAIR', 'SOFA', 'BENCH', 'STORAGE', 'FURNITURE', 'TABLE'].includes(value)) {
                throw new Error('Please enter a valid category');
            }
            return true;
        }),

    body('discount', 'invalid discount percent')
        .isFloat({ min: 0.01, max: 1 })
        .isLength({max: 4}),

    body('description', 'description should not be empty')
        .notEmpty()
];


module.exports = {
    postProductValidator
}