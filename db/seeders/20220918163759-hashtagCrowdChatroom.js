"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("hashtags", [
      {
        name: "food",
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("crowds", [
      {
        recorded_at: new Date(),
        area_id: 4,
        user_id: 1,
        pin_id: 3,
        crowd_size: "",
        crowd_intensity: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("chatrooms", [
      {
        room_name: "",
        active: true,
        host_user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("hashtags", null, {});
    await queryInterface.bulkDelete("crowds", null, {});
    await queryInterface.bulkDelete("chatrooms", null, {});
  },
};
