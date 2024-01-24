const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Group = sequelize.define(
  "group",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Group;
