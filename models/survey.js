const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    q1: {
        type: String,
        required: true
    },
    q2: {
        type: Boolean,
        required: true
    },
    q3: {
        type: Boolean,
        required: true
    },
    q4: {
        type: Boolean,
        required: true
    },
    q5: {
        type: Boolean,
        required: true
    },
    q6: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

const Survey = mongoose.model('Surveys', SurveySchema)
module.exports = { Survey }
