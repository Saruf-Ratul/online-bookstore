const express = require('express');
const { addOrder, getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(protect, addOrder);
router.route('/history').get(protect, getOrderHistory);

module.exports = router;