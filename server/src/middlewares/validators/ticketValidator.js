const { body } = require('express-validator');

const sendTicketValidator = [
    body('ticketText')
        .notEmpty()
        .if((value, { req }) => req.role === 'ADMIN')
        .withMessage('ticket text should not be empty')
        .if((value, { req }) => req.role === 'CUSTOMER')
        .withMessage('reply text should not be empty')
];


module.exports = {
    sendTicketValidator
}