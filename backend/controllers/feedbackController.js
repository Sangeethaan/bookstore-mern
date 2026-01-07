const Feedback = require('../models/Feedback');

// @desc    Get recent feedback
// @route   GET /api/feedback
// @access  Public
const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({})
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new feedback
// @route   POST /api/feedback
// @access  Public
const addFeedback = async (req, res) => {
    const { name, rating, comment } = req.body;

    try {
        const feedback = new Feedback({
            name,
            rating,
            comment,
        });

        const createdFeedback = await feedback.save();
        res.status(201).json(createdFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllFeedback, addFeedback };
