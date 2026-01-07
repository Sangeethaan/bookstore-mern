const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        maxlength: 200,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
