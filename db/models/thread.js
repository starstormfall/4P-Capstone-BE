"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      // define association here
    }
  }
  Thread.init(
    {
      topic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "thread",
      underscored: true,
    }
  );
  return Thread;
};
