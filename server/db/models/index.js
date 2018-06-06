const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const LineItem = require('./lineItem');

//Associations:
Order.belongsTo(User);
User.hasMany(Order);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });


module.exports = {
  User,
  Order,
  Product,
  Review,
  LineItem
};
