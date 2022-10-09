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
          model: "Posts",
          key: "id",
        },
      },
      threadId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Threads",
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
