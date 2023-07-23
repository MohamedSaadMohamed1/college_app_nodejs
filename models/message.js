const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = new mongoose.Schema({
	senderId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: [ 'text', 'image', 'record', 'video', 'file'],
        default: 'text',
        lowercase: true,
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message,
}