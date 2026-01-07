const express = require('express');
const router = express.Router();
const { getAllFeedback, addFeedback } = require('../controllers/feedbackController');

router.route('/').get(getAllFeedback).post(addFeedback);

module.exports = router;
