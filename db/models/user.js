"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      nationality: DataTypes.STRING,
      score: DataTypes.INTEGER,
      lastLogin: DataTypes.DATE,
      loginStreak: DataTypes.INTEGER,
      photoLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
