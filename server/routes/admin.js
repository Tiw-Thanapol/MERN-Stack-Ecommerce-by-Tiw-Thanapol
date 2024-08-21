const express = require('express');
const router = express.Router();

// Middleware
const { auth, adminCheck } = require('../middleware/auth');

// Controller
const { changeOrderStatus, getOrderAdmin } = require('../controllers/admin');

// Endpoint: http://localhost:8888/api/admin/order-status
// Method: PUT
// Access: Private
router.put('/admin/order-status', auth, adminCheck, changeOrderStatus);
router.get('/admin/orders', auth, adminCheck, getOrderAdmin);

module.exports = router;
