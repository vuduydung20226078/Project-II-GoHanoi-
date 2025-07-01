const CartItem = require('../models/cartModel');
const Bike = require('../models/bikeModel');
const Brand = require('../models/brandModel');

class CartService {
    async getCartByUser(userId) {
        return await CartItem.findAll({
            where: { user_id: userId },
            include: {
                model: Bike,
                include: [Brand]
            }
        });
    }

    async addToCart(userId, bikeId) {
        const [item, created] = await CartItem.findOrCreate({
            where: { user_id: userId, bike_id: bikeId },
            defaults: { quantity: 1 }
        });

        if (!created) {
            item.quantity += quantity;
            await item.save();
        }

        return item;
    }

    async removeFromCart(itemId) {
        return await CartItem.destroy({ where: { id: itemId } });
    }

    async clearCart(userId) {
        return await CartItem.destroy({ where: { user_id: userId } });
    }
}

module.exports = new CartService();
