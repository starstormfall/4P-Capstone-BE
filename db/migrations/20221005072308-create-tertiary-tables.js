"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // POSTS MODEL
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: Sequelize.STRING,
      photo_link: Sequelize.STRING,
      content: Sequelize.TEXT,
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "areas",
          key: "id",
        },
      },
      pin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "pins",
          key: "id",
        },
      },

      location_name: Sequelize.STRING,
      forum_post: Sequelize.BOOLEAN,
      explore_post: Sequelize.STRING,
      quoted_explore: Sequelize.BOOLEAN,
      external_link: Sequelize.STRING,
      like_count: Sequelize.INTEGER,
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // CHATROOM_USERS MODEL
    await queryInterface.createTable("chatroom_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chatroom_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // CROWD MODEL
    await queryInterface.createTable("crowds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      recorded_at: Sequelize.DATE,
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      pin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "pins",
          key: "id",
        },
      },
      crowd_size: Sequelize.STRING,
      crowd_intensity: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // MESSAGES MODEL
    await queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: Sequelize.STRING,
      chatroom_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      poster_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
    await queryInterface.dropTable("chatroom_users");
    await queryInterface.dropTable("messages");
    await queryInterface.dropTable("crowds");
  },
};
