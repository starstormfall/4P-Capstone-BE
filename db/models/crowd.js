"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Crowd extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.area);
      this.belongsTo(models.pin);
    }
  }
  Crowd.init(
    {
      recordedAt: DataTypes.DATE,
      areaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "areas",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "pins",
          key: "id",
        },
      },
      crowdSize: DataTypes.STRING,
      crowdIntensity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "crowd",
      underscored: true,
    }
  );
  return Crowd;
};
