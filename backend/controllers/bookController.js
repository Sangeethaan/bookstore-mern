const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Public (for now)
const addBook = async (req, res) => {
    try {
        const { title, author, price, stockQuantity, genre, description, imageUrl } = req.body;
        const book = new Book({
            title, author, price, stockQuantity, genre, description, imageUrl
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update book details or stock
// @route   PUT /api/books/:id
// @access  Public
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.price = req.body.price || book.price;
            book.stockQuantity = req.body.stockQuantity !== undefined ? req.body.stockQuantity : book.stockQuantity;
            book.genre = req.body.genre || book.genre;
            book.description = req.body.description || book.description;
            book.imageUrl = req.body.imageUrl || book.imageUrl;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { getBooks, addBook, updateBook, deleteBook };
