const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
    total: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = Order;
