const express = require('express');
const router = express.Router();

router.get('/qr-confirm', (req, res) => {
    const { orderId, provider } = req.query;
    res.send(`
    <h1>${provider.toUpperCase()} QR Demo</h1>
    <p>Đơn hàng #${orderId}</p>
    <form method="POST" action="/api/payment/webhook">
      <input type="hidden" name="orderId" value="${orderId}" />
      <input type="hidden" name="status" value="paid" />
      <button type="submit">✅ Xác nhận thanh toán</button>
    </form>
  `);
});

module.exports = router;
// This route simulates a QR confirmation page for payment providers like VNPay or MoMo.
// It accepts an order ID and provider name as query parameters, then displays a confirmation form.