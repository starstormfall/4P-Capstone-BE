"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // HASHTAGS MODEL
    await queryInterface.createTable("hashtags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
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

    // PINS MODEL --> mapItems
    await queryInterface.createTable("pins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lat: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      lng: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      place_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "areas",
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

    //CHATROOM MODEL
    await queryInterface.createTable("chatrooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      room_name: Sequelize.STRING,
      active: Sequelize.BOOLEAN,
      host_user_id: {
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
    await queryInterface.dropTable("hashtags");
    await queryInterface.dropTable("pins");
    await queryInterface.dropTable("chatrooms");
  },
};
