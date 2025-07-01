const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:id', cartController.getCart);
router.post('/', cartController.add);
router.delete('/:cartId', cartController.remove);
router.delete('/:userId', cartController.clear); // Xoá tất cả sản phẩm trong giỏ hàng của người dùng
module.exports = router;
