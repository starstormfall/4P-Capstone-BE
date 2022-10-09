"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Crowd);
      this.hasMany(models.Post);
      this.belongsTo(models.Area);
    }
  }
  Pin.init(
    {
      lat: DataTypes.INTEGER,
      lng: DataTypes.INTEGER,
      placeName: DataTypes.STRING,
      areaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Areas",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Pin",
      underscored: true,
    }
  );
  return Pin;
};
