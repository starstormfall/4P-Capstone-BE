"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatroomUser extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Chatroom);
      this.belongsTo(models.User);
    }
  }
  ChatroomUser.init(
    {
      chatroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Chatrooms",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ChatroomUser",
      underscored: true,
    }
  );
  return ChatroomUser;
};
