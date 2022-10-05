"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.crowd);
      this.hasMany(models.post);
    }
  }
  Area.init(
    {
      prefecture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "area",
      underscored: true,
    }
  );
  return Area;
};
