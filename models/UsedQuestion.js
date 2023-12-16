const { Model, DataTypes } = require('sequelize');
const sequelize = require('..config/connection');

//create Used_question model
class Used_question extends Model {}

//create fields/columns for Used_question model
Used_question.init(
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
        modelName: 'used_question'
    }
);