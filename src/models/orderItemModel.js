const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');

class OrderDetail extends Model { }

OrderDetail.init({
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    bike_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_per_hour: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: true,
});

module.exports = OrderDetail;
