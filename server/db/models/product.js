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
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.blackberrycafe.cz/wp-content/uploads/2017/05/Product-Image-Coming-Soon.png'
  },
  category: {
    type: Sequelize.ENUM,
    values: ['swag', 'drink']
  }
})

module.exports = Product
