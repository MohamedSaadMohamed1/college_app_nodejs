const { Message, validate } = require('../models/message')
const auth = require('../middlewares/auth')
const { getUserById } = require('../utils/webSockets')

const _ = require('lodash')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.use(auth);

router.get('/', async(req, res) => {
    const messages = await Message.find({ roomId: req.body.roomId })
        // .skip(req.params.page - 1)
        // .limit(69);
    if (!messages) return res.status(400).send({ success: false, message:'ID is not correct'});

    res.json({
        success: true,
        messages,
    });
});

router.post('/', async(req, res)=> {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).json({ success: false, message: error.details[0].message })
    const message = new Message(_.pick(req.body, [
        "sender",
		"senderId",
        "data",
        "roomId",
        "timestamp",
        "type",
    ]))
    await message.save();
    getUserById(req.token._id).to(message.roomId).broadcast.emit('new message', { message });
    res.json({ success: true });
});

router.put('/', async(req, res)=> {
    const message = await Message.updateOne({ _id: req.body._id },{
        $set:{ data: req.body.data, tags: req.body.tags }
    });
    if (!message) return res.status(400).send({ success: false, message:'ID is not correct'});
    getUserById(req.token._id).to(message.roomId).broadcast.emit('update message', { message });
    res.send({ success:true });
});

router.delete('/:_id', async(req, res)=> {
    if (!req.params._id) return res.status(400).json({ error: 'missing ID' });
    const message = await Message.findOneAndDelete({ _id: parseInt(req.params.id) });
    if (!message) return res.status(400).json({ error: 'message not found' });
    getUserById(req.token._id).to(message.roomId).broadcast.emit('delete message', { message });
    res.json({ success: true });
});

module.exports = router;