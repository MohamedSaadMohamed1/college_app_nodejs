const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        enum: [
            'semester_1',
            'semester_2',
            'semester_3',
            'semester_4',
            'semester_5',
            'semester_6',
            'semester_7',
            'semester_8',
            'Extras',
        ],
        required: true,
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = {
    Course,
}