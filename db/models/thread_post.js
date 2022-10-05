"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThreadPost extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.thread);
      this.belongsTo(models.post);
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
      modelName: "threadPost",
      underscored: true,
    }
  );
  return ThreadPost;
};
