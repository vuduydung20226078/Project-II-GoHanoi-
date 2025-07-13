const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');

class Order extends Model { }

Order.init({
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_method: { type: DataTypes.STRING, allowNull: false },
    payment_status: { type: DataTypes.STRING, defaultValue: 'pending' },
    rental_hours: { type: DataTypes.INTEGER, allowNull: false },
    receive_time: { type: DataTypes.DATE, allowNull: false },
    order_status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
            isIn: [["pending", "ongoing", "returned", "failed"]]
        }
    },

}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    freezeTableName: true
});

module.exports = Order;
