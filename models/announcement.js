const mongoose = require('mongoose');
const Joi = require('joi');

const announceSchema = new mongoose.Schema({
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
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'Announcement should have at least 1 tag'
        }
    },
    msgType: {
        type: String,
        enum: [ 'text', 'image', 'record', 'video', 'file'],
        default: 'text',
        lowercase: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    // views: {
    //     type: Number,
    //     default: 0
    // }
})

const Announcement = mongoose.model('Announcement', announceSchema);

module.exports = {
    Announcement,
}