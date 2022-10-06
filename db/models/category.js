"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.posts, { through: models.postCategory });
      this.hasMany(models.hashtag);
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
    }
  );
  return Category;
};
