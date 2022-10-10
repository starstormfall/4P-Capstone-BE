"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  Favourite.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
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
      modelName: "favourite",
      underscored: true,
    }
  );
  return Favourite;
};
