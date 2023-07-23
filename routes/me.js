const { User } = require('../models/user')
const auth = require('../middlewares/auth')

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.use(auth);

router.put('/password', async(req, res) => {
    let user = await User.findOne({ _id: req.token._id });
    //const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
    const validPassword = req.body.oldPassword === user.password
    if (!validPassword) return res.status(400).send({ error: 'password is not correct' });
    const salt = await bcrypt.genSalt(10, "a");
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);

    await User.updateOne({ _id: req.body._id }, {
        $set: { password: newPassword }
    });
    res.json({ success: true });
});

router.put('/nickname', async(req, res)=> {
    const update =await User.updateOne({ _id: req.token._id },{
        $set:{ nickname:req.body.nickname}
    });
    if (!update) return res.status(400).send({error:'ID is not correct'});
    res.json({ success: true });
});

router.put('/courses', async (req, res) => {
    const update = await User.updateOne({ _id: req.token._id }, {
        $set:{ courses: req.body.courses }
    });
    if (!update) return res.status(400).json({ success: false, message:'collegeId is not correct'});
    res.json({ success: true });
})

module.exports = router;