const { body } = require('express-validator');


const createOrEditProductValidator = [
    body().custom((value, { req }) => {
        console.log(req.body);
        if (req.wrongFileFormat) throw new Error('please upload files in jpg/png/jpeg formats');
        return true;
    }),

    body('productId', 'product id should not be empty')
        .if(body('productId').exists())
        .trim()
        .notEmpty(),

    body('orderId', 'order id should not be empty')
        // .if(body('productId').not().exists())
        .trim()
        .notEmpty(),

    body('itemId', 'item id should not be empty')
        // .if(body('productId').not().exists())
        .trim()
        .notEmpty(),


    body('title', 'title should not be empty')
        .if(body('productId').not().exists())
        .trim()
        .notEmpty(),

    body('quantity', 'please enter a valid quantity')
        .if(body('productId').not().exists())
        .isInt({ min: 1 }),


    body('price', 'please enter a valid price')
        .if(body('productId').not().exists())
        .isFloat({ min: 0.01 })
        .isLength({ max: 4 }),

    body('category', 'category should not be empty')
        .if(body('productId').not().exists())
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            if (!['CHAIR', 'SOFA', 'BENCH', 'STORAGE', 'FURNITURE', 'TABLE'].includes(value)) {
                throw new Error('Please enter a valid category');
            }
            return true;
        }),

    body('discount', 'invalid discount percentage')
        .if(body('productId').not().exists())
        .if(body('discount').exists())
        .isFloat({ min: 0.01, max: 1 })
        .isLength({ max: 4 }),

    body('discountExpiration', 'invalid expiration date')
        .if(body('productId').not().exists())
        .if(body('discountExpiration').exists())
        .isISO8601()
        .toDate()
        .custom((value, { req }) => {
            const expiration = new Date(value);
            if (expiration < Date.now()) {
                throw new Error('please enter a valid delivery date');
            }
            return true;
        }),

    body('description', 'description should not be empty')
        .if(body('productId').not().exists())
        .trim()
        .notEmpty()
];


module.exports = {
    createOrEditProductValidator
}