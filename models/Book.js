const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
});

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: [ReviewSchema]
});

BookSchema.methods.calculateRating = function() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    this.rating = sum / this.reviews.length;
};

module.exports = mongoose.model('Book', BookSchema);