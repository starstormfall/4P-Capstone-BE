"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.category);
      this.belongsToMany(models.post, { through: "post_hashtags" });
      this.hasMany(models.postHashtag);
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
      modelName: "hashtag",
      underscored: true,
    }
  );
  return Hashtag;
};
