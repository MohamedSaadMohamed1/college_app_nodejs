const { User, validate } = require('../models/user')
const { admin } = require('../middlewares/roles')

const auth = require('../middlewares/auth')
const _ = require('lodash')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.use(auth);
router.use(admin);

router.get('/role', async (req, res) => {
    const update = await User.updateOne({
        collegeId: req.body.collegeId,
        role: { $nin: [ 'admin' ] }
        }, {
        $set:{ role: req.body.role }
    });
    if (!update) return res.status(400).json({ success: false, message:'collegeId is not correct'});
    res.json({ success: true });
});

router.put('/union', async (req, res) => {
    const update = await User.updateOne({ collegeId: req.body.collegeId }, {
        $set:{ isUnionMember: req.body.isUnionMember }
    });
    if (!update) return res.status(400).json({ success: false, message:'collegeId is not correct'});
    res.json({ success: true });
});

module.exports = router;