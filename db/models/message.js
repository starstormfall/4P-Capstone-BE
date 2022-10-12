"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.chatroom);
      // this.belongsTo(models.user);
      this.belongsTo(models.user, {
        as: "posterUser",
        foreignKey: "posterUserId",
      });
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      chatroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      posterUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "message",
      underscored: true,
    }
  );
  return Message;
};
