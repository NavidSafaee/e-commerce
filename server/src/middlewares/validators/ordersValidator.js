const { body, oneOf } = require('express-validator');


const postOrderValidator = [
    oneOf([
        [
            body('orderItems')
                .exists()
                .isArray()
                .custom((value, { req }) => {
                    return value.every(item => {
                        return typeof item === 'object' 
                            && Object.keys(item).length === 2 
                            && Object.keys(item).includes('product') 
                            && Object.keys(item).includes('quantity') 
                            && Object.keys(item.product).length === 1 
                            && Object.keys(item.product).includes('title')
                    })
                })
        ],
        body().custom((value, { req }) => {
            if (req.role !== 'ADMIN') {
                return true;
            }
        })
    ]),
];



module.exports = {
    postOrderValidator
}