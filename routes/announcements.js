const { Announcement, validate } = require('../models/announcement')
const auth = require('../middlewares/auth')

const _ = require('lodash')
const mongoose = require('mongoose')
const express = require('express')
const { getUserById } = require('../utils/webSockets')
const router = express.Router()

router.use(auth);

router.get('/', async (req, res) => {
    const announcements = await Announcement.find({ tags: { $in: req.body.tags } })
        // .skip(req.params.page - 1)
        // .limit(69);
    if (!announcements) return res.status(400).send({ success: false, message:'ID is not correct'});

    res.json({
        success: true,
        announcements,
    });
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).json({ success: false, message: error.details[0].message })
    const announcement =new Announcement(_.pick(req.body, [
            'sender',
			'senderId',
            'data',
            'tags',
            'type',
            'timestamp',
        ]))
    await announcement.save();
    if(req.body.userId)
    getUserById(req.token._id).to(
        announcement.tags.map(({ roomId }) => ({ roomId }))
    ).broadcast.emit('new announcement', { announcement });
    res.json({ success: true });
});

router.put('/', async(req, res)=> {
    const announcement = await Announcement.findOneAndUpdate({ _id: req.body._id },{
        $set:{ data: req.body.data, tags: req.body.tags }
    });
    if (!announcement) return res.status(400).send({ success: false, message:'ID is not correct'});
    getUserById(req.body.userId).to(
        announcement.tags.map(({ roomId }) => ({ roomId }))
    ).broadcast.emit('update announcement', { announcement });
    res.send({ success:true });
});

router.delete('/', async(req, res)=> {
    const announcement = await Announcement.findOneAndRemove({ _id: req.body._id });
    if (!announcement) return res.status(400).send({ success: false, message:'ID is not correct'});
    getUserById(req.token._id).to(
        announcement.tags.map(({ roomId }) => ({ roomId }))
    ).broadcast.emit('delete announcement', { announcement });
    res.send({ success: true });
});

module.exports = router;