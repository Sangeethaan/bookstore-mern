import React, { useState } from 'react';
import { FaCartPlus, FaBook, FaTimes } from 'react-icons/fa';

const BookCard = ({ book, addToCart }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    const handleFlipBack = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(book);
    };

    return (
        <div
            className="group h-96 w-full perspective-1000 bg-transparent cursor-pointer select-none"
            onClick={handleFlip}
            onMouseLeave={handleMouseLeave}
        >
            {/* Inner Container: The Flapper */}
            <div
                className={`relative h-full w-full transition-transform duration-700 transform-style-3d shadow-xl rounded-xl ${isFlipped ? 'rotate-y-180' : ''}`}
            >

                {/* === FRONT SIDE === */}
                <div className="absolute inset-0 h-full w-full backface-hidden theme-card rounded-xl overflow-hidden shadow-md flex flex-col">
                    {/* Top Right User Badge */}
                    <span className="absolute top-3 right-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm opacity-90">
                        {book.genre}
                    </span>

                    {/* Image Section (75%) */}
                    <div className="h-[75%] w-full flex items-center justify-center bg-[var(--bg-color)] p-6">
                        {book.imageUrl ? (
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-gray-300">
                                <FaBook size={64} />
                            </div>
                        )}
                    </div>

                    {/* Bottom Section (25%): Minimal Info */}
                    <div className="h-[25%] px-5 flex items-center justify-between theme-card border-t border-gray-100">
                        <div className="flex flex-col max-w-[70%]">
                            <h3 className="text-md font-bold line-clamp-1 leading-tight mb-1" title={book.title}>
                                {book.title}
                            </h3>
                            <span className="text-xl font-bold text-blue-600">
                                ₹{book.price}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={book.stockQuantity <= 0}
                            className={`p-3 rounded-xl shadow-sm transition-transform active:scale-95 flex-shrink-0 ${book.stockQuantity > 0
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            title={book.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
                        >
                            <FaCartPlus size={18} />
                        </button>
                    </div>
                </div>

                {/* === BACK SIDE === */}
                <div className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 theme-card rounded-xl overflow-hidden shadow-md p-6 flex flex-col justify-between border border-gray-100">

                    {/* Close Button */}
                    <button
                        onClick={handleFlipBack}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors z-20"
                        title="Flip Back"
                    >
                        <FaTimes size={18} />
                    </button>

                    {/* Top Content */}
                    <div className="flex-grow overflow-hidden flex flex-col">
                        <span className={`inline-block w-max text-[10px] font-bold px-2 py-0.5 rounded mb-4 ${book.stockQuantity < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {book.stockQuantity} IN STOCK
                        </span>

                        <h3 className="text-xl font-bold leading-tight mb-1">
                            {book.title}
                        </h3>
                        <p className="text-sm font-medium mb-4 opacity-75">
                            by {book.author}
                        </p>

                        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-2">
                            <p className="text-sm leading-relaxed opacity-90">
                                {book.description || "No description available."}
                            </p>
                        </div>
                    </div>

                    {/* Bottom: Add to Cart Button */}
                    <div className="mt-2 pt-2 border-t border-gray-50">
                        <button
                            onClick={handleAddToCart}
                            disabled={book.stockQuantity <= 0}
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-transform active:scale-95 ${book.stockQuantity > 0
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <FaCartPlus /> {book.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookCard;
