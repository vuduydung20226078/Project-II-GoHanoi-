const cartService = require('../services/cartService/');

class CartController {
    async getCart(req, res) {
        const userId = req.params.id; // bạn cần xử lý xác thực login để có userId
        try {
            const cart = await cartService.getCartByUser(userId);
            res.json(cart);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: err });
        }
    }

    async add(req, res) {
        const {userId, bikeId} = req.body;
        try {
            const item = await cartService.addToCart(userId, bikeId);
            res.status(201).json(item);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng', error: err });
        }
    }

    async remove(req, res) {
        try {
            await cartService.removeFromCart(req.params.id);
            res.json({ message: 'Đã xoá khỏi giỏ hàng' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi xoá khỏi giỏ hàng', error: err });
        }
    }
    async clear(req, res) {
        try {
            await cartService.clearCart(req.params.id);
            res.json({ message: 'Đã xoá tất cả danh sách khỏi giỏ hàng' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi xoá tất cả danh sách khỏi giỏ hàng', error: err });
        }
    }
}

module.exports = new CartController();
