const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Quiz model
class Quiz extends Model {}

//create fields/columns for quiz model
Quiz.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question',
                key: 'id',
                unique: false
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quiz'
    }
);

module.exports = Quiz;