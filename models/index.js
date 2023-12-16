//Import the Model files
const Question = require('./Question');
const Category = require('./Category');
const Tag = require('./Tag');
const User = require('./User');
const Question_tag = require('./QuestionTag');
const Used_question = require('./UsedQuestion');

//Set up associations between models
//Define a question having one category to create a foreign key in the 'category table'
//Category has many questions, and if you delete category, you delete the associated questions
Question.hasOne(Category, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
});

Category.belongsTo(Question, {
    foreignKey: 'question_id',
});

//One questions belongs to many users who have used it, and 
Question.belongsToMany(Tag, {
    //Define the third table needed to store the foreign keys
    through: {
        model: Question_tag,
    },
    //Define alias for when data is retrieved
    as: 'questions'
});

Tag.belongsToMany(Question, {
    //Define third table to store foreign keys
    through: {
        model: Question_tag,
    },
    //alias for when data is retrieved
    as: 'tags'
})

//Associations for User to Question Model
Question.belongsToMany(User, {
    through: {
        model: Used_question,
    },
    //alias showing the used_questions for each user 
    as: 'used_questions'
});

User.belongsToMany(Question, {
    through: {
        model: Used_question,
    },
    //alias showing the users of each question
    as: 'users' 
    
})

//For tracking who created question so they don't get asked that one
//User has many questions and if user is deleted, so are their questions
Question.belongsTo(User, {
    foreignKey: 'created_question_id',
});

User.hasMany(Question, {
    foreignKey: 'created_question_id',
    onDelete: 'CASCADE'
})



module.exports = { Question, Category, Tag, Question_tag, User, Used_question };

