const { validationResult } = require('express-validator');
``
function validate(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let err;
        if (errors.array()[0].msg === 'Invalid value(s)') {
            console.log(errors.array()[0].nestedErrors[0]);
            err = new Error(errors.array()[0].nestedErrors[0][0].msg);
        } else {
            err = new Error(errors.array()[0].msg);
        }

        err.statusCode = 400;
        err.data = errors.array();
        throw err;
    }
}


module.exports = validate;