"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.area);
      this.belongsToMany(models.category, { through: "post_categories" });
      this.belongsToMany(models.hashtag, { through: "post_hashtags" });
      this.belongsTo(models.user);
      this.belongsToMany(models.user, { through: models.favourite });
      this.belongsToMany(models.user, { through: models.like });
      this.belongsToMany(models.thread, { through: "thread_posts" });
      this.hasMany(models.friendship);
      this.belongsTo(models.pin);
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
      modelName: "post",
      underscored: true,
    }
  );
  return Post;
};
