"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Crowd extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Pin);
    }
  }
  Crowd.init(
    {
      recordedAt: DataTypes.DATE,

      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Pins",
          key: "id",
        },
      },
      crowdSize: DataTypes.STRING,
      crowdIntensity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Crowd",
      underscored: true,
    }
  );
  return Crowd;
};
