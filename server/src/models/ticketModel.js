const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    chat: [{
        role: {
            type: String,
            enum: ['CUSTOMER', 'ADMIN'],
            required: true
        },
        chatText: {
            type: String,
            required: true,
            date: {
                type: Date,
                required: true
            }
        }
    }]
});

module.exports = model('Ticket', ticketSchema);