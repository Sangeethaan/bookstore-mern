import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBook, FaBoxOpen, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-100 transition">
                        <FaBook />
                        <span>BookStore</span>
                    </Link>

                    <div className="hidden md:flex space-x-2">
                        <Link to="/" className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${isActive('/')}`}>
                            <FaBook /> Home
                        </Link>
                        <Link to="/inventory" className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${isActive('/inventory')}`}>
                            <FaBoxOpen /> Inventory
                        </Link>
                        <Link to="/cart" className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${isActive('/cart')}`}>
                            <FaShoppingCart /> Cart
                        </Link>
                        <Link to="/orders" className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 ${isActive('/orders')}`}>
                            <FaBook /> My Orders
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="block px-3 py-2 rounded-md hover:bg-blue-800">Home</Link>
                    <Link to="/inventory" className="block px-3 py-2 rounded-md hover:bg-blue-800">Inventory</Link>
                    <Link to="/cart" className="block px-3 py-2 rounded-md hover:bg-blue-800">Cart</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
