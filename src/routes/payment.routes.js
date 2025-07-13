const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// API tạo đơn hàng
router.post('/', PaymentController.createOrder);

// Webhook cho VNPay và MoMo
router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;
