"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.crowd);
      this.hasMany(models.post);
      this.belongsTo(models.area);
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
          model: "areas",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "pin",
      underscored: true,
    }
  );
  return Pin;
};
