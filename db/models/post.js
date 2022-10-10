"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Area);
      this.belongsToMany(models.Category, { through: "post_categories" });
      this.belongsToMany(models.Hashtag, { through: "post_hashtags" });
      this.belongsTo(models.User);
      this.belongsToMany(models.User, { through: models.Favourite });
      this.belongsToMany(models.User, { through: models.Like });
      this.belongsToMany(models.Thread, { through: "thread_posts" });
      this.hasMany(models.Friendship);
      this.belongsTo(models.Pin);
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
      pinId: {
        type: DataTypes.INTEGER,
        references: {
          model: "pins",
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
      modelName: "Post",
      underscored: true,
    }
  );
  return Post;
};
