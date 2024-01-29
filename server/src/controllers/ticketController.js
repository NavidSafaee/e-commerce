const {
    getMyOpenTicket,
    getMyResolvedTicket,
    changeTicketStatus,
    sendTicket,
    replyToTicket,
    getMyTickets,
    getOpenTicketsCount,
    getOpenTickets
} = require('../services/ticketService');


async function httpGetMyTickets(req, res, next) {
    try {
        const userId = req.userId;
        const response = await getMyTickets();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetMyOpenTicket(req, res, next) {
    try {
        const response = await getMyOpenTicket();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetMyResolvedTicket(req, res, next) {
    try {
        const response = await getMyResolvedTicket();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpChangeTicketStatus(req, res, next) {
    try {
        const ticketId = req.params.ticketId;
        await changeTicketStatus(ticketId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


async function httpSendTicket(req, res, next) {
    try {
        const userId = req.userId;
        await sendTicket(userId, req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function httpReplyToTicket(req, res, next) {
    try {
        const ticketId = req.params.ticketId;
        const ticketText = req.body.ticketText;
        const response = await replyToTicket(ticketId, ticketText);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetOpenTickets(req, res, next) {
    try {
        const response = await getOpenTickets();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpGetOpenTicketsCount(req, res, next) {
    try {
        const response = await getOpenTicketsCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetMyOpenTicket,
    httpGetMyResolvedTicket,
    httpChangeTicketStatus,
    httpSendTicket,
    httpReplyToTicket,
    httpGetMyTickets,
    httpGetOpenTicketsCount,
    httpGetOpenTickets
}