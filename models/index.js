//Import the Model files
const Question = require('./Question');
const Category = require('./Category');
const Tag = require('./Tag');
const User = require('./User');
const Question_tag = require('./Question_tag');

//Set up associations between models
//Define a question having one category to create a foreign key in the 'category table'
Question.hasOne(Category, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
});

Category.belongsTo(Question, {
    foreignKey: 'question_id',
});

Question.hasMany(Tag {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
});

//user model for 
User.hasMany(Question, {

})

Tag.belongsToMany(Question, {
    through: {
        model: Question_tag,
        unique: false
    },
    //define the alias for when data is retreived
    as: 'tags'
});





module.exports = { Question, Category, Tag, Question_tag };

