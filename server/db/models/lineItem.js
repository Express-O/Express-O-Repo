const db = require('../db')
const Sequelize = require('sequelize')

const LineItem = db.define('LineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: Sequelize.INTEGER,

})

module.exports = LineItem
