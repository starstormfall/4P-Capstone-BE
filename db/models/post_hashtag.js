"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostHashtag extends Model {
    static associate(models) {
      // define association here
    }
  }
  PostHashtag.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      hashtagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "hashtags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "postHashtag",
      underscored: true,
    }
  );
  return PostHashtag;
};
