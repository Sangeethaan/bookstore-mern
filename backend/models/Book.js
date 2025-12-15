const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
