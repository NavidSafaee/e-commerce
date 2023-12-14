const { body, oneOf } = require('express-validator');


const changeCartItemQuantityValidator = [
    body().custom((value, { req }) => {
        if (req.query.action !== 'increase' && req.query.action !== 'decrease') throw new Error('invalid action');
        return true;
    })
];


module.exports = {
    changeCartItemQuantityValidator
}
