const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');

class Brand extends Model { }

Brand.init({
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: false
});

module.exports = Brand;
