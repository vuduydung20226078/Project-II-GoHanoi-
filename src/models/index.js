const Bike = require('./bikeModel');
const Brand = require('./brandModel');

Brand.hasMany(Bike, { foreignKey: 'brand_id' });
Bike.belongsTo(Brand, { foreignKey: 'brand_id' });

module.exports = { Bike, Brand };
