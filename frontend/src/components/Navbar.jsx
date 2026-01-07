import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBook, FaBoxOpen, FaShoppingCart, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? 'bg-white/20' : '';

    return (
        <nav className="theme-nav text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-100 transition">
                        <FaBook />
                        <span>BookStore</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className={`px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 ${isActive('/')}`}>
                            <FaBook /> Home
                        </Link>
                        <Link to="/inventory" className={`px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 ${isActive('/inventory')}`}>
                            <FaBoxOpen /> Inventory
                        </Link>
                        <Link to="/cart" className={`px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 ${isActive('/cart')}`}>
                            <FaShoppingCart /> Cart
                        </Link>
                        <Link to="/orders" className={`px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 ${isActive('/orders')}`}>
                            <FaBook /> My Orders
                        </Link>
                        <Link to="/community" className={`px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 ${isActive('/community')}`}>
                            <FaUserCircle /> Community
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="ml-4 p-2 rounded-full hover:bg-white/20 transition focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-200" />}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/20 transition focus:outline-none"
                        >
                            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-200" />}
                        </button>
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
                <div className="md:hidden theme-nav px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10">
                    <Link to="/" className="block px-3 py-2 rounded-md hover:bg-white/10">Home</Link>
                    <Link to="/inventory" className="block px-3 py-2 rounded-md hover:bg-white/10">Inventory</Link>
                    <Link to="/cart" className="block px-3 py-2 rounded-md hover:bg-white/10">Cart</Link>
                    <Link to="/orders" className="block px-3 py-2 rounded-md hover:bg-white/10">My Orders</Link>
                    <Link to="/community" className="block px-3 py-2 rounded-md hover:bg-white/10">Community</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
