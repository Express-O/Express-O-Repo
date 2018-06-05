const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/640px-No_image_available_600_x_450.svg.png'
  },
  category: {
    type: Sequelize.ENUM,
    values: ['category 1', 'category 2']
  }
})

module.exports = Product
