const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Question_tag model
class Question_tag extends Model {}

//create fields/columns for Question_tag model
Question_tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'question',
                key: 'id',
                unique: false
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id',
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question_tag'
    }
);

module.exports = Question_tag;