"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Post);
    }
  }
  Favourite.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Favourite",
      underscored: true,
    }
  );
  return Favourite;
};
