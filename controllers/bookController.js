const Book = require('../models/Book');

exports.getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.createBook = async(req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.searchBooks = async(req, res) => {
    try {
        const { query } = req.query;
        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') },
                { genre: new RegExp(query, 'i') }
            ]
        });
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getBooks = async(req, res) => {
    const { page = 1, limit = 10, sortBy = 'title', order = 'asc' } = req.query;
    const sortOrder = order === 'asc' ? 1 : -1;

    try {
        const books = await Book.find()
            .sort({
                [sortBy]: sortOrder
            })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.addReview = async(req, res) => {
    const { rating, review } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        const newReview = {
            user: req.user._id,
            review,
            rating
        };

        book.reviews.push(newReview);
        book.calculateRating();
        await book.save();

        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};