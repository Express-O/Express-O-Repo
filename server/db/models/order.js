const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('cart', 'incomplete'),
        defaultValue: 'cart'
    },
    total: Sequelize.INTEGER
});

module.exports = Order
