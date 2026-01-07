const Order = require('../models/Order');
const Book = require('../models/Book');

// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    const { customerName, address, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        // Check stock for all items first
        for (const item of items) {
            const book = await Book.findById(item.bookId);
            if (!book) {
                return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
            }
            if (book.stockQuantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
            }
        }

        // If stock is okay, deduct stock and create order
        for (const item of items) {
            const book = await Book.findById(item.bookId);
            book.stockQuantity -= item.quantity;
            await book.save();
        }

        const order = new Order({
            customerName,
            address,
            items,
            totalAmount
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders or filter by customer name
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
    try {
        const { customerName } = req.query;
        let query = {};

        if (customerName) {
            query.customerName = { $regex: customerName, $options: 'i' };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders };
