const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstLogin:{
        type:Boolean,
        default:true
    },
    email: {
        type: String,
        maxlength: 255,
        lowercase: true,
        // required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    },
    collegeID: {
        type: String,
        minlength: 9,
        maxlength: 11,
        unique: true,
        index: true,
        match: /^20.*/,
        required: true
    },
    nickname: {
        type: String,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    profilePic: {
        type: String,
    },
    collage: {
        type: String,
        required: true,
    },
    patch: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'normal',
        enum: ['normal', 'moderator', 'admin'],
        lowercase: true
    },
    isUnionMember: {
        type: Boolean,
        default: false
    },
    ChoosenCourses: {
        type: [String],
    },
})

userSchema.methods.generateAuthToken = function () {
    return  jwt.sign(
        {
            _id: this._id,
            userRole: this.userRole,
            isUnionMember: this.isUnionMember,
        },
        config.get('jwtPrivateKey')
    );
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
}
