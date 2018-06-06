const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    total: Sequelize.DECIMAL
});

module.exports = Order
