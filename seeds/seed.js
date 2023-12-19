const sequelize = require('../config/connection');
const { Category, Question, Quiz, User } = require('../models');

const categorySeedData = require('./categorySeedData.json');
const questionSeedData = require('./questionSeedData.json');
const userSeedData = require('./userSeedData');
const quizSeedData = require('./quizSeedData.json');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userSeedData);
    console.log('Users seeded successfully.');
    const categories = await Category.bulkCreate(categorySeedData);
    console.log('Categories seeded successfully.');
    const questions = await Question.bulkCreate(questionSeedData);
    console.log('Questions seeded successfully.');
    const quiz = await Quiz.bulkCreate(quizSeedData);
    console.log('Quizzes seeded successfully.'); 
  
    // const users = await User.bulkCreate(userSeedData);
    console.log('Database seeded successfully.');
    process.exit(0);
  
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();