const{ Room }= require('../models/room');
const auth = require('../middlewares/auth')

const mongoose =require('mongoose');
const express = require('express');
const router = express.Router();

router.use(auth);

router.get('/', async(req, res)=> {
    const users = await Room.findOne({ roomID: req.body.roomID })
        .select({ users:1 });
    if (!users) return res.status(400).send({error:'RoomID is not correct'});
    res.json({
        success: true,
        users,
    });
});

module.exports = router;