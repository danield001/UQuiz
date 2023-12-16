const sequelize = require('../config/connection');
const { Category, Question, QuestionTag, Tag, User, UsedQuestions } = require('../models');

const categorySeedData = require('./categorySeedData.json');
const questionSeedData = require('./questionSeedData.json');
const tagSeedData = require('./tagSeedData.json');
const userSeedData = require('./userSeedData');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const categories = await Category.bulkCreate(categorySeedData);
    console.log('Categories seeded suxxessfully.');
    const questions = await Question.bulkCreate(questionSeedData);
    console.log('Questions seeded successfully.');
    // const tags = await Tag.bulkCreate(tagSeedData);
  
    // const users = await User.bulkCreate(userSeedData);
    console.log('Database seeded successfully.');
    process.exit(0);
  
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();