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
                }),
                
            body('deliveryDate')
                .isISO8601()
                .toDate()
                .custom((value, { req }) => {
                    const deliveryDate = new Date(value);
                    if (deliveryDate < Date.now()) {
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