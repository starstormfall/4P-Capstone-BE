"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    static associate(models) {
      // define association here
    }
  }
  Pin.init(
    {
      lat: DataTypes.INTEGER,
      lng: DataTypes.INTEGER,
      placeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pin",
      underscored: true,
    }
  );
  return Pin;
};
