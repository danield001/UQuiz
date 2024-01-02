const Sequelize = require('sequelize');
require('dotenv').config();
const mysql2 = require('mysql2'); // Correct package name

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Use Heroku database URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false, // Disable logging to console
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Use local database credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: true, // Enable logging to console
    }
  );
}

module.exports = sequelize;
