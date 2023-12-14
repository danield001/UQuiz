const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'The Arts',
  },
  {
    category_name: 'Current Affairs',

  }
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;