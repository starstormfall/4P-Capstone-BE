"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Post, { through: "thread_posts" });
    }
  }
  Thread.init(
    {
      topic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Thread",
      underscored: true,
    }
  );
  return Thread;
};
