const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Question model
class Question extends Model {}

//create fields/columns for Question model
Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        question_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //This column will store a reference of the id of the category that classifies this question.
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            },
        },
        used_by_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id',
            },
        },
        //This one also refers to the user id but for the purpose of storing who created the question.
        created_by_id: {
            type: DataTypes.INTEGER,
            references: { 
            model: 'user',
            key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question'
    }
);

module.exports = Question;