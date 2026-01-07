import React, { useState } from 'react';
import api from '../api';
import { FaSearch, FaHistory } from 'react-icons/fa';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchName.trim()) return;

        setLoading(true);
        try {
            const res = await api.get(`/orders?customerName=${searchName}`);
            setOrders(res.data);
            setSearched(true);
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaHistory className="text-blue-600" /> My Orders
            </h1>

            {/* Search Section */}
            <div className="theme-card p-6 rounded-xl shadow-md mb-8">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter your name to view history..."
                        className="flex-1 border border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-[var(--input-bg)] text-[var(--text-color)]"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        {loading ? 'Searching...' : <><FaSearch /> Find Orders</>}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {searched && (
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-lg border border-[var(--border-color)]">
                            <p className="opacity-60 text-lg">No orders found for "{searchName}".</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order._id} className="theme-card rounded-xl shadow overflow-hidden border border-[var(--border-color)]">
                                <div className="bg-white/5 px-6 py-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-sm opacity-60">Order ID: <span className="font-mono opacity-100 font-bold">{order._id}</span></p>
                                        <p className="text-sm opacity-60">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold">₹{order.totalAmount.toFixed(2)}</p>
                                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-semibold mb-3">Items:</h4>
                                    <ul className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex justify-between text-sm border-b border-[var(--border-color)] pb-2 last:border-0 last:pb-0">
                                                <span className="opacity-90">
                                                    Quantity: {item.quantity} (Book ID: {item.bookId})
                                                    {/* Ideally populate book title in backend aggregation, but ID is fine for now/MVP */}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-[var(--border-color)] text-sm opacity-70">
                                        <span className="font-semibold">Shipping to:</span> {order.address}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
