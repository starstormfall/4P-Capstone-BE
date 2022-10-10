"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Post);
      this.belongsTo(models.Category);
    }
  }
  PostCategory.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "PostCategory",
      underscored: true,
    }
  );
  return PostCategory;
};
