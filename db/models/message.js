"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Chatroom);
      this.belongsTo(models.User);
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
      modelName: "Message",
      underscored: true,
    }
  );
  return Message;
};
