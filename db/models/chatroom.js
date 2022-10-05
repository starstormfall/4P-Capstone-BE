"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: models.chatroomUser });
      this.hasMany(models.message);
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
      modelName: "chatroom",
      underscored: true,
    }
  );
  return Chatroom;
};
