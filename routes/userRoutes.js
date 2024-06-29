const express = require('express');
const { getProfile, getUsers, updateUserRole } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

const router = express.Router();

// Get current user profile
router.get('/profile', protect, getProfile);

// Admin routes
router.route('/')
    .get(protect, authorize('admin'), getUsers);

router.route('/:id')
    .put(protect, authorize('admin'), updateUserRole);

module.exports = router;