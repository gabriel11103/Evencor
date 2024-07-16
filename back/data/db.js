const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
  logging: false,
});

module.exports = db;
