const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');

//Associations:
Order.belongsTo(User);
User.hasMany(Order);
Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);

Product.belongsToMany(Order, { through: 'PurchaseHistory' });
Order.belongsToMany(Product, { through: 'PurchaseHistory' });


module.exports = {
  User,
  Order,
  Product,
  Review
};
