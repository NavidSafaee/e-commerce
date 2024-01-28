const Ticket = require('../models/ticketModel');


async function getMyTickets(userId) {
    return await Ticket.find({ customer: userId });
}

async function getMyOpenTicket(userId) {
    return await Ticket.find({ customer: userId, status: 'OPEN' });
}

async function getMyResolvedTicket(userId) {
    return await Ticket.find({ customer: userId, status: 'RESOLVED' });
}

async function changeTicketStatus(ticketId) {
    await Ticket.findByIdAndUpdate(ticketId, { status: 'RESOLVED' });
}

async function sendTicket(userId, reqBody) {
    const { ticketId, ticketText } = reqBody;
    let ticket;

    if (ticketId) {
        ticket = await Ticket.findOne({ _id: ticketId, customer: userId });
        if (!ticket) {
            const error = new Error('Ticket not found');
            error.statusCode = 404;
            throw error;
        }

        ticket.status = 'OPEN';
        ticket.chat.push({
            role: 'CUSTOMER',
            chatText: ticketText,
            date: new Date()
        });

    } else {
        ticket = new Ticket({
            customer: userId,
            chat: [{
                role: 'CUSTOMER',
                chatText: ticketText,
                date: new Date()
            }],
            status: 'OPEN'
        });
    }

    await ticket.save();
    return ticket;
}


async function replyToTicket(ticketId, ticketText) {
    const ticket = await Ticket.findById(ticketId);

    if (ticket.status === 'RESOLVED') {
        const error = new Error('You can\'n reply to resolved ticket');
        error.statusCode = 400;
        throw error;
    }

    ticket.chat.push({
        role: 'ADMIN',
        chatText: ticketText,
        date: new Date()
    });

    await ticket.save();
    return ticket;
}





module.exports = {
    getMyTickets,
    getMyOpenTicket,
    getMyResolvedTicket,
    changeTicketStatus,
    sendTicket,
    replyToTicket
}