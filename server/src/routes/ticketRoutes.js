const express = require('express');


const {
    httpGetMyOpenTicket,
    httpGetMyResolvedTicket,
    httpChangeTicketStatus,
    httpSendTicket,
    httpReplyToTicket,
    httpGetMyTickets,
    httpGetOpenTicketsCount,
    httpGetOpenTickets
} = require('../controllers/ticketController');
const { isAuth, isCustomer, isAdmin } = require('../middlewares/auth');
const { ticketChatValidator } = require('../middlewares/validators/ticketValidator');


const router = express.Router();


router.get('/me', isAuth, isCustomer, httpGetMyTickets);
router.get('/me/open', isAuth, isCustomer, httpGetMyOpenTicket);
router.get('/me/resolved', isAuth, isCustomer, httpGetMyResolvedTicket);
router.put('/me', isAuth, isCustomer, ticketChatValidator, httpSendTicket);
router.put('/:ticketId/reply', isAuth, isAdmin, ticketChatValidator, httpReplyToTicket);
router.patch('/:ticketId/resolved', isAuth, isAdmin, httpChangeTicketStatus);
router.get('/open/count', isAuth, isAdmin, httpGetOpenTicketsCount);
router.get('/open', isAuth, isAdmin, httpGetOpenTickets);



module.exports = router;