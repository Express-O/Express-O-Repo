const db = require('../db')
const Sequelize = require('sequelize')

const LineItem = db.define('lineItem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: Sequelize.DECIMAL
})

module.exports = LineItem
