const mongoose = require('mongoose');

const ResourcesListSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    }
});

const Resources = mongoose.model('Resources', ResourcesListSchema)
module.exports = { Resources }