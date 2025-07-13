const PaymentService = require('../services/paymentService');

class PaymentController {
    static async createOrder(req, res) {
        try {
            const { userId, name, phone, bikes, paymentMethod, receiveTime, rentalHours } = req.body;
            const result = await PaymentService.createOrder(userId, name, phone, bikes, paymentMethod, receiveTime, rentalHours);
            res.status(201).json({ message: 'Tạo đơn hàng thành công', order: result.order });
        } catch (error) {
            res.status(500).json({ message: 'Tạo đơn hàng thất bại', error: error.message });
        }
    }
    static async handleWebhook(req, res) {
        try {
            const { orderId, status } = req.body;
            await PaymentService.updatePaymentStatus(orderId, status);
            res.json({ message: 'Thanh toán thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Webhook thất bại', error: err.message });
        }
    }
}

module.exports = PaymentController;
