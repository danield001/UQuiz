const sequelize = require('../config/connection');
const { Category, Question, QuestionTag, Tag, User } = require('../models');

const categorySeedData = require('./categorySeedData.json');
const questionSeedData = require('./questionSeedData.json');
const tagSeedData = require('./tagSeedData.json');
const userSeedData = require('./userSeedData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const questions = await Question.bulkCreate(questionSeedData);
  
  const categories = await Category.bulkCreate(categorySeedData);

  const tags = await Tag.bulkCreate(tagSeedData);

  const users = await User.bulkCreate(userSeedData);

  process.exit(0);
};

seedDatabase();