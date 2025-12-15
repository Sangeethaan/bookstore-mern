import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (bookId) => {
        const newCart = cart.filter(item => item.bookId !== bookId);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const updateQuantity = (bookId, newQuantity) => {
        if (newQuantity < 1) return;
        const newCart = cart.map(item =>
            item.bookId === bookId ? { ...item, quantity: newQuantity } : item
        );
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        const customerName = document.getElementById('customerName').value;
        const address = document.getElementById('address').value;

        if (!customerName || !address) {
            alert("Please fill in both Name and Address.");
            return;
        }

        try {
            const orderData = {
                customerName,
                address,
                items: cart.map(item => ({ bookId: item.bookId, quantity: item.quantity })),
                totalAmount: Number(calculateTotal())
            };

            await api.post('/orders', orderData);

            alert(`Order placed successfully! Redirecting to your orders.`);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/orders');
        } catch (error) {
            console.error("Checkout failed:", error);
            alert('Checkout failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                <FaShoppingBag className="text-blue-600" /> Your Shopping Cart
            </h1>

            {cart.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow text-center">
                    <div className="text-gray-300 mb-4 flex justify-center"><FaShoppingBag size={64} /></div>
                    <h2 className="text-xl text-gray-600">Your cart is empty.</h2>
                    <button onClick={() => navigate('/')} className="mt-6 text-blue-600 font-medium hover:underline">
                        Go back to shopping
                    </button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        {cart.map(item => (
                            <div key={item.bookId} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100">
                                <div className="flex items-center gap-4">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.title} className="w-16 h-20 object-cover rounded" />
                                    ) : (
                                        <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">?</div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                        <p className="text-blue-600 font-medium">₹{item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center border rounded">
                                        <button onClick={() => updateQuantity(item.bookId, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
                                        <span className="px-3 font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.bookId, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.bookId)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:w-80">
                        <div className="bg-white p-6 rounded-xl shadow sticky top-4">
                            <h2 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h2>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Items ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-xl font-bold text-gray-900 border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>₹{calculateTotal()}</span>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-700">Checkout Details</h3>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border rounded p-2 text-sm"
                                    id="customerName"
                                />
                                <input
                                    type="text"
                                    placeholder="Shipping Address"
                                    className="w-full border rounded p-2 text-sm"
                                    id="address"
                                />
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                >
                                    <FaCheckCircle /> Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
