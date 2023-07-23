const mongoose = require('mongoose');
const Joi = require('joi');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        index: true,
        unique: true,
    },
    users: {
        type: [String],
        required: true,
    },
})

const Room = mongoose.model('Room', roomSchema);

module.exports = {
    Room,
};