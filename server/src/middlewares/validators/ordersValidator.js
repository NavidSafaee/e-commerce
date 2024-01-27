const { body, oneOf } = require('express-validator');


const postOrderValidator = [
    oneOf([
        [
            body('orderItems', 'please enter valid order items')
                .exists()
                .isArray()
                .custom((value, { req }) => {
                    return value.every(item => {
                        return typeof item === 'object'
                            && Object.keys(item).length === 2
                            && Object.keys(item).includes('product')
                            && Object.keys(item).includes('quantity')
                            && Object.keys(item.product).length >= 1
                            && Object.keys(item.product).length <= 3
                            && Object.keys(item.product).includes('title')
                            && Object.keys(item.product).includes('price')
                    })
                }),
                
            body('deliveryDate', 'please enter a valid delivery date')
                .isISO8601()
                .toDate()
                .custom((value, { req }) => {
                    if (value < Date.now()) {
                        throw new Error('please enter a valid delivery date');
                    }
                    return true;
                }),
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