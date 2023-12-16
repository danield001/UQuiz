const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
//Add early some details of bcrypt code - NEEDS more and checking
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//create fields/columns for User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[6],
            },
        },
        //This one also refers to the user id but for the purpose of storing who created the question.
        questions_created: {
            type: DataTypes.INTEGER,
            references: { 
            model: 'question',
            key: 'id',
            },
        },
    },
    {
        //bcrypt used to encrypt the password before saving
        hooks: {
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;