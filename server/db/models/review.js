const db = require('../db');
const Sequelize = require('sequelize');

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
        validate: {
            min: 1,
            max: 5
        }
    }
})

module.exports = Review;
