const sequelize = require('../config/connection');
const seedQuestion = require('./questionData');
const seedCategory = require('./categoryData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedQuestion();

  await seedCategory();

//   await seedUser();

  process.exit(0);
};

seedAll();