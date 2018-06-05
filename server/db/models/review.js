const db = require('../db');
const Sequelize = require('sequelize');

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }

})

module.exports = Review;

