const{ Course }= require('../models/course');
const auth = require('../middlewares/auth')

const mongoose =require('mongoose');
const express = require('express');
const router = express.Router();

router.use(auth);

router.get('/', async(req, res)=> {
    const courses =await Course.find()
    if (!courses) return res.status(400).send({ success: false, message:'RoomID is not correct'});
    res.json({
        success: true,
        courses,
    });
});

module.exports = router;