import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';

const InventoryPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '', author: '', price: '', stockQuantity: '', genre: '', description: '', imageUrl: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

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

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/books/${editId}`, formData);
                alert('Book updated successfully!');
            } else {
                await api.post('/books', formData);
                alert('Book added successfully!');
            }
            setFormData({ title: '', author: '', price: '', stockQuantity: '', genre: '', description: '', imageUrl: '' });
            setIsEditing(false);
            setEditId(null);
            fetchBooks();
        } catch (error) {
            console.error("Error saving book:", error);
            alert('Failed to save book');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.delete(`/books/${id}`);
                setBooks(books.filter(book => book._id !== id));
                alert('Book deleted successfully');
            } catch (error) {
                console.error("Error deleting book:", error);
                alert('Failed to delete book');
            }
        }
    };

    const handleEdit = (book) => {
        setFormData({
            title: book.title,
            author: book.author,
            price: book.price,
            stockQuantity: book.stockQuantity,
            genre: book.genre,
            description: book.description || '',
            imageUrl: book.imageUrl || ''
        });
        setIsEditing(true);
        setEditId(book._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <FaBoxOpen className="text-3xl text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
                            {isEditing ? <FaEdit className="text-yellow-500" /> : <FaPlus className="text-green-500" />}
                            {isEditing ? 'Edit Book' : 'Add New Book'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Author</label>
                                <input name="author" value={formData.author} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Genre</label>
                                <input name="genre" value={formData.genre} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className={`flex-1 text-white p-2 rounded-md font-medium hover:opacity-90 transition ${isEditing ? 'bg-yellow-500' : 'bg-green-600'}`}>
                                    {isEditing ? 'Update Book' : 'Add Book'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', author: '', price: '', stockQuantity: '', genre: '', description: '', imageUrl: '' }); }} className="px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Info</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {loading ? (
                                        <tr><td colSpan="3" className="text-center py-4">Loading...</td></tr>
                                    ) : books.map(book => (
                                        <tr key={book._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                <div className="text-sm text-gray-500">{book.author}</div>
                                                <div className="text-xs text-gray-400 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">{book.genre}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 font-bold">₹{book.price}</div>
                                                <div className={`text-sm ${book.stockQuantity < 5 ? 'text-red-500 font-bold' : 'text-green-600'}`}>
                                                    {book.stockQuantity} Left
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleEdit(book)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    <FaEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-900">
                                                    <FaTrash size={18} />
                                                </button>
                                                {/* Future: Add Delete */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
