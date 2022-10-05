"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "food",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "sightseeing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "accomodation",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "fashion",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
