const mongoose = require('mongoose');

const MoodRatingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true
    },
    lat: Number,
    lng: Number,
    ratings: {
        type: Number,
        required: true
    },
    numOfRatings: Number
});

const Ratings = mongoose.model('Ratings', MoodRatingSchema)
module.exports = { Ratings }
