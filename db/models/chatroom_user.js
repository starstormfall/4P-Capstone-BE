"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatroomUser extends Model {
    static associate(models) {
      // define association here
    }
  }
  ChatroomUser.init(
    {
      chatroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chatrooms",
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
    },
    {
      sequelize,
      modelName: "chatroomUser",
      underscored: true,
    }
  );
  return ChatroomUser;
};
