const Order = require('../models/Order');

exports.addOrder = async(req, res) => {
    const { books, totalPrice } = req.body;
    try {
        const order = await Order.create({
            user: req.user._id,
            books,
            totalPrice
        });
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getOrderHistory = async(req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};