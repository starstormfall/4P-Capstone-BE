"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Post);
      this.hasMany(models.Pin);
    }
  }
  Area.init(
    {
      prefecture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Area",
      underscored: true,
    }
  );
  return Area;
};
