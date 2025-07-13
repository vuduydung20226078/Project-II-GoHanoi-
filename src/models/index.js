const Bike = require('./bikeModel');
const Brand = require('./brandModel');
const User = require('./userModel');
const Cart = require('./cartModel');
const Order = require('./orderModel');
const OrderDetail = require('./orderItemModel');

Brand.hasMany(Bike, { foreignKey: 'brand_id' });
Bike.belongsTo(Brand, { foreignKey: 'brand_id' });

Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Cart, { foreignKey: 'user_id' });

Cart.belongsTo(Bike, { foreignKey: 'bike_id' });
Bike.hasMany(Cart, { foreignKey: 'bike_id' });

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Bike, { foreignKey: 'bike_id' });

module.exports = { Bike, Brand, User, Cart, Order, OrderDetail };
