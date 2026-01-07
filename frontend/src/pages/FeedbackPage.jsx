import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/feedback');
            const data = await response.json();
            if (response.ok) {
                setFeedbacks(data);
            }
        } catch (err) {
            console.error("Failed to fetch feedback", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !comment) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating, comment }),
            });

            const data = await response.json();

            if (response.ok) {
                setFeedbacks([data, ...feedbacks]);
                setName('');
                setRating(5);
                setComment('');
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to submit feedback');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Community Feedback</h1>
                <p className="mt-2 opacity-70">See what our readers are saying.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Submit Section */}
                <div className="md:col-span-1">
                    <div className="theme-card rounded-lg shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                    maxLength="50"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Share your thoughts..."
                                    maxLength="200"
                                ></textarea>
                                <p className="text-right text-xs opacity-60 mt-1">{comment.length}/200</p>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>

                {/* Display Section */}
                <div className="md:col-span-2 space-y-4">
                    {feedbacks.length === 0 ? (
                        <p className="text-center py-8 opacity-60">No feedback yet. Be the first!</p>
                    ) : (
                        feedbacks.map((item) => (
                            <div key={item._id} className="theme-card rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-4 border border-gray-100">
                                <div className="flex-shrink-0">
                                    <FaUserCircle className="text-gray-300 text-4xl" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold">{item.name}</h3>
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-200"} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs opacity-50">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="opacity-90">{item.comment}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
