const express = require('express');
const { getBooks, getBook, createBook, updateBook, deleteBook, addReview, searchBooks } = require('../controllers/bookController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');
const { cacheMiddleware } = require('../utils/cache');

const router = express.Router();

router.route('/').get(getBooks).post(protect, authorize('admin'), createBook);
router.route('/:id').get(getBook).put(protect, authorize('admin'), updateBook).delete(protect, authorize('admin'), deleteBook);

router.route('/').get(cacheMiddleware, getBooks);

router.route('/').get(getBooks).post(protect, createBook);
router.route('/:id').get(getBook).put(protect, updateBook).delete(protect, deleteBook);
router.route('/search').get(searchBooks);

router.route('/:id/review').post(protect, addReview);



module.exports = router;