const { body } = require('express-validator');

const addReviewValidator = [
    body('rating', 'Rating must be an integer between 1 and 5')
        .isInt({ min: 1, max: 5 }),

    body('review', 'Review should not be empty')
        .notEmpty(),
];

const changeReviewStatusValidator = [
    body('validationStatus')
        .custom((value, { req }) => {
            if(value !== 'VALID' && value !== 'INVALID') {
                throw new Error('invalid validation status');
            }
            return true;
        })    
];


module.exports = {
    addReviewValidator,
    changeReviewStatusValidator
}