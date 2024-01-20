const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  userName: Sequelize.STRING,
});

module.exports = Message;
