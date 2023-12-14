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
            autoIncrement: true
        },
        question_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
        }
// ADD
//Used_by_id
// created_by_id

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