"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.crowd);
      this.belongsToMany(models.post);
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
