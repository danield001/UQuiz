const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Answer model
class Answer extends Model {}

//create fields/columns for Answer model
Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "question",
                key: "id",
                unique: false
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
                unique: false
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'answer'
    }
);

module.exports = Answer;