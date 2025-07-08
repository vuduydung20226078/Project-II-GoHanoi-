const CartItem = require('../models/cartModel');
const Bike = require('../models/bikeModel');
const Brand = require('../models/brandModel');

class CartService {
    async getCartByUser(userId) {
        const items = await CartItem.findAll({
            where: { user_id: userId },
            include: {
                model: Bike,
                include: [Brand]
            }
        });

        // Chuyển tất cả các instance thành JSON thuần túy
        return items.map(item => item.toJSON());
    }
    

    async addToCart(userId, bikeId, quantity = 1) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        const [item, created] = await CartItem.findOrCreate({
            where: { user_id: userId, bike_id: bikeId },
            defaults: { quantity }
        });

        if (!created) {
            item.quantity += quantity;
            await item.save();
        }

        return item.toJSON();
    }
    

    async removeFromCart(itemId) {
        return await CartItem.destroy({ where: { id: itemId } });
    }

    async clearCart(userId) {
        return await CartItem.destroy({ where: { user_id: userId } });
    }
}

module.exports = new CartService();
