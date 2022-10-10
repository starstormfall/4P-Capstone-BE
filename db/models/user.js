"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Crowd);
      this.hasMany(models.Post);
      this.belongsToMany(models.Post, { through: models.Favourite });
      this.belongsToMany(models.Post, { through: models.Like });
      this.hasMany(models.Friendship, {
        as: "initiatedUser",
        foreignKey: "initiatedUserId",
      });
      this.hasMany(models.Friendship, {
        as: "addedUser",
        foreignKey: "addedUserId",
      });
      this.belongsToMany(models.Chatroom, { through: "chatroom_users" });
      this.hasMany(models.Message);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      nationality: DataTypes.STRING,
      score: DataTypes.INTEGER,
      lastLogin: DataTypes.DATE,
      loginStreak: DataTypes.INTEGER,
      photoLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
