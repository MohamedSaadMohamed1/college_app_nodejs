const { User } = require('../models/user')

const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


/** get token **/
router.post('/', async(req, res) => {
    //const { error } = validateLogin(req.body)
    //if (error)
    //  return res.status(400).json({ success: false, message: error.details[0].message })

    let user = await User.findOne({ collegeId: req.body.collegeId });
    if (!user) return res.status(400).send({ error: 'collegeID is not correct' });


    //const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    const validPassword = (req.body.password === user.password);
    if (!validPassword) return res.status(400).send({ error: 'password is not correct' });

    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
        .json({
            success: true,
            token,
            user: _.pick(user, [
                '_id',
                'role',
                'isUnionMember',
                'email',
                'collegeID',
                'name',
                'profilePic',
                'collage',
                'patch',
                'ChoosenCourses',
            ]),
            firstLogin: user.firstLogin,
        })
})

function validateLogin(user) {
    const schema = Joi.object({
        password: Joi.string()
            .required(),
        collegeID: Joi.string()
            .pattern(/^20.*/)
            .unique()
            .required(),
    })
    return Joi.validate(user, schema)
}

module.exports = router;