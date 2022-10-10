"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.belongsToMany(models.Post, { through: "post_hashtags" });
    }
  }
  Hashtag.init(
    {
      name: DataTypes.STRING,
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
      modelName: "Hashtag",
      underscored: true,
    }
  );
  return Hashtag;
};
