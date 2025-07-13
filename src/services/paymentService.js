const Order = require('../models/orderModel');
const OrderDetail = require('../models/orderItemModel');
const Bike = require('../models/bikeModel');
const User = require('../models/userModel');
const CartItem = require('../models/cartModel'); 


class PaymentService {
    static async createOrder(userId, name, phone, bikes, paymentMethod, receiveTime, rentalHours) {
        let total = 0;
        // Cập nhật thông tin người dùng nếu chưa có name/phone
        const user = await User.findByPk(userId);
        if (!user) throw new Error(`User với ID ${userId} không tồn tại`);

        // Chỉ cập nhật nếu name hoặc phone còn null
        let needUpdate = false;
        if (!user.name && name) {
            user.name = name;
            needUpdate = true;
        }
        if (!user.phone && phone) {
            user.phone = phone;
            needUpdate = true;
        }
        if (needUpdate) await user.save();
        // Tính tổng tiền
        console.log(bikes)
        for (const item of bikes) {
            console.log(item);
            const bike = await Bike.findByPk(parseInt(item.bike_id));
            if (!bike) throw new Error(`Xe với ID ${item.bike_id} không tồn tại`);
            total += (bike.price_per_hour * item.quantity * rentalHours);
        }

        // Tạo đơn hàng
        const order = await Order.create({
            user_id: userId,
            total_price: total,
            payment_method: paymentMethod,
            payment_status: 'pending',
            rental_hours: rentalHours,
            receive_time: receiveTime
        });

        // Tạo chi tiết đơn hàng
        for (const item of bikes) {
            const bike = await Bike.findByPk(item.bike_id);
            await OrderDetail.create({
                order_id: order.id,
                bike_id: item.bike_id,
                quantity: item.quantity,
                price_per_hour: bike.price_per_hour,
                subtotal: bike.price_per_hour * item.quantity * rentalHours
            });
        }

        return { order };
    }

    static async updatePaymentStatus(orderId, status) {
        const order = await Order.findByPk(orderId);
        if (!order) throw new Error('Order not found');

        order.payment_status = status;
        await order.save();

        if (status === "pending" || status === "paid") {
            // ➕ Giả sử dùng userId để truy tìm Cart
            const carts = await Cart.findAll({
                where: {
                    userId: order.userId
                }
            });

            const cartIds = carts.map(c => c.id);

            if (cartIds.length > 0) {
                await CartItem.destroy({
                    where: { cartId: cartIds }
                });
            }
        }

        return order;
    }


}

module.exports = PaymentService;
