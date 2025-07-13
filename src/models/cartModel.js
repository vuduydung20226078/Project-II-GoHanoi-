const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class CartItem extends Model { }

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bike_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: true,
});

module.exports = CartItem;
