const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    softwareId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;