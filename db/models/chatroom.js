"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: "chatroom_users" });
      this.hasMany(models.Message);
    }
  }
  Chatroom.init(
    {
      roomName: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      hostUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Chatroom",
      underscored: true,
    }
  );
  return Chatroom;
};
