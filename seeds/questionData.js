const { Question } = require('../models');

const questionData = [
  {
    question_body: 'What two colours make green when painting?',
    answer_body: 'yellow and blue',
  },
  {
    question_body: 'Who is the current Prime Minister of Australia?',
    answer_body: 'Anthony Albanese',
  }
];

const seedQuestion = () => Question.bulkCreate(questionData);

module.exports = seedQuestion;