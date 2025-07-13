const qrcode = require('qrcode');

async function generateFakeQR(orderId, provider) {
    const confirmUrl = `http://localhost:3000/api/scan/qr-confirm?orderId=${orderId}&provider=${provider}`;
    return await qrcode.toDataURL(confirmUrl);
}

module.exports = { generateFakeQR };
