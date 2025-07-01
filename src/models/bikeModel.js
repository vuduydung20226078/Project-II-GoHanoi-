const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');

class Bike extends Model { }

Bike.init({
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    price_per_hour: DataTypes.DECIMAL(10, 2),
    type: DataTypes.STRING(50),
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rate: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0.0,
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'available',
    },
    brand_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'brands',
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Bike',
    tableName: 'bikes',
    timestamps: false
});

module.exports = Bike;
