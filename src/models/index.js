const Bike = require('./bikeModel');
const Brand = require('./brandModel');
const User = require('./userModel');
const Cart = require('./cartModel');

Brand.hasMany(Bike, { foreignKey: 'brand_id' });
Bike.belongsTo(Brand, { foreignKey: 'brand_id' });

Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Cart, { foreignKey: 'user_id' });

Cart.belongsTo(Bike, { foreignKey: 'bike_id' });
Bike.hasMany(Cart, { foreignKey: 'bike_id' });


module.exports = { Bike, Brand };
