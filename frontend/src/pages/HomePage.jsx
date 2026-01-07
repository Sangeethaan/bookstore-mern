import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaSearch } from 'react-icons/fa';
import BookCard from '../components/BookCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await api.get('/books');
            setBooks(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setLoading(false);
        }
    };

    const addToCart = (book) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.bookId === book._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                bookId: book._id,
                title: book.title,
                price: book.price,
                quantity: 1,
                imageUrl: book.imageUrl
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Dispatch a storage event or use a custom event to notify other components if needed
        // For now, simple alert
        const btn = document.getElementById(`btn-${book._id}`);
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Added!';
            btn.classList.add('bg-green-600');
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600');
            }, 1000);
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Featured Books</h1>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard key={book._id} book={book} addToCart={addToCart} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
