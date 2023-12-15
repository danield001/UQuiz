//Import the Model files
const Question = require('./Question');
const Category = require('./Category');
const Tag = require('./Tag');
const User = require('./User');
const Question_tag = require('./QuestionTag');

//Set up associations between models
//Define a question having one category to create a foreign key in the 'category table'
Question.hasOne(Category, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
});

Category.belongsTo(Question, {
    foreignKey: 'question_id',
});

Question.belongsToMany(Tag, {
    //Define the third table needed to store the foreign keys
    through: {
        model: Question_tag,
    },
    //Define alias for when data is retrieved
    as: 'tags'
});

Tag.belongsToMany(Question, {
    //Define third table to store foreign keys
    through: {
        model: Question_tag,
    },
    //alias for when data is retrieved
    as: 'questions'
})

//Associations for User to Question Model
Question.hasMany(User, {
    foreignKey: 'used_by',
    onDelete: 'CASCADE',
});

User.belongsTo(Question, {
    foreignKey: 'used_by',
})

Question.hasMany(User, {
    foreignKey: 'created_by',
});

User.belongsTo(Question, {
    foreignKey: 'created_by',
})



module.exports = { Question, Category, Tag, Question_tag, User };

