"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Post);
      this.belongsTo(models.User, {
        as: "initiatedUser",
        foreignKey: "initiatedUserId",
      });
      this.belongsTo(models.User, {
        as: "addedUser",
        foreignKey: "addedUserId",
      });
    }
  }
  Friendship.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      initiatedUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      addedUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      reason: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Friendship",
      underscored: true,
    }
  );
  return Friendship;
};
