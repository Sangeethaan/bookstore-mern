const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Shipped'], default: 'Pending' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
