import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaCartPlus, FaSearch } from 'react-icons/fa';

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
                        <div key={book._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                            <div className="h-64 w-full relative group">
                                {book.imageUrl ? (
                                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain rounded-t-lg group-hover:scale-105 transition duration-300" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                        <FaBook size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                                    {book.genre}
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-lg font-bold text-gray-800 line-clamp-1" title={book.title}>{book.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                                <p className="text-gray-600 text-xs line-clamp-2 mb-3 flex-grow">{book.description}</p>

                                <div className="flex justify-between items-center mt-auto mb-3">
                                    <span className="text-lg font-bold text-blue-600">₹{book.price}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${book.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {book.stockQuantity > 0 ? `${book.stockQuantity} Left` : 'Sold Out'}
                                    </span>
                                </div>

                                <button
                                    id={`btn-${book._id}`}
                                    onClick={() => addToCart(book)}
                                    className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition ${book.stockQuantity > 0
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={book.stockQuantity <= 0}
                                >
                                    <FaCartPlus /> {book.stockQuantity > 0 ? 'Add' : 'Out'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
