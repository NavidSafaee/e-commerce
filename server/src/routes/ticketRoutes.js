const express = require('express');


const {
    httpGetMyOpenTicket,
    httpGetMyResolvedTicket,
    httpChangeTicketStatus,
    httpSendTicket,
    httpReplyToTicket,
    httpGetMyTickets
} = require('../controllers/ticketController');
const { isAuth, isCustomer, isAdmin } = require('../middlewares/auth');
const { sendTicketValidator } = require('../middlewares/validators/ticketValidator');


const router = express.Router();


router.get('/me', isAuth, isCustomer, httpGetMyTickets);
router.put('/me', isAuth, isCustomer, sendTicketValidator, httpSendTicket);
router.get('/me/open', isAuth, isCustomer, httpGetMyOpenTicket);
router.get('/me/resolved', isAuth, isCustomer, httpGetMyResolvedTicket);
router.put('/:ticketId/reply', isAuth, isAdmin, httpReplyToTicket);
router.patch('/:ticketId/resolved', isAuth, isAdmin, httpChangeTicketStatus);



module.exports = router;