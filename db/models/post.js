"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      photoLink: DataTypes.STRING,
      content: DataTypes.STRING,
      areaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "areas",
          key: "id",
        },
      },
      locationName: DataTypes.STRING,
      forumPost: DataTypes.BOOLEAN,
      explorePost: DataTypes.STRING,
      externalLink: DataTypes.STRING,
      likeCount: DataTypes.INTEGER,
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
      modelName: "post",
      underscored: true,
    }
  );
  return Post;
};
