"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.post);
      this.belongsTo(models.user, {
        as: "initiatedUser",
        foreignKey: "initiatedUserId",
      });
      this.belongsTo(models.user, {
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
          model: "posts",
          key: "id",
        },
      },
      initiatedUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      addedUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      reason: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "friendship",
      underscored: true,
    }
  );
  return Friendship;
};
