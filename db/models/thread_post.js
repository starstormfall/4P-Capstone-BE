"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThreadPost extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Thread);
      this.belongsTo(models.Post);
    }
  }
  ThreadPost.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      threadId: {
        type: DataTypes.INTEGER,
        references: {
          model: "threads",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ThreadPost",
      underscored: true,
    }
  );
  return ThreadPost;
};
