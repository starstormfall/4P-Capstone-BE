"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pins", [
      {
        lat: 35.7102804499109,
        lng: 139.8107540503681,
        place_name: "Tokyo Skytree",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.6580941780747,
        lng: 139.70062600334023,
        place_name: "Shibuya Station",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.68537526335177,
        lng: 139.75282096818782,
        place_name: "Imperial Palace",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.67171743634906,
        lng: 139.76373682026164,
        place_name: "Ginza",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.69983102516376,
        lng: 139.77143354741682,
        place_name: "Akihabara Electric Town",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.64425659276558,
        lng: 139.7842595502139,
        place_name: "Toyosu Market",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.65772593964628,
        lng: 139.700193673912,
        place_name: "Tokyu Plaza Shibuya",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.66474699237705,
        lng: 139.7315949321066,
        place_name: "Roppongi Takeoka Building",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.669601829631254,
        lng: 139.68889723429578,
        place_name: "Takamatsu DC Building",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.69197678117832,
        lng: 139.77069506276857,
        place_name: "Kajicho",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.70444248887056,
        lng: 139.57894000700148,
        place_name: "Kichijoji Cosmo",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.72687889776904,
        lng: 139.71266227663926,
        place_name: "Minami Ikebukuro",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.66232378944908,
        lng: 139.74886072221597,
        place_name: "Atago Green Hills MORI Tower",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 35.641260759231244,
        lng: 139.67228328914527,
        place_name: "Perming Japan",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 1,
      },
      {
        lat: 42.497820818641394,
        lng: 141.14869239352544,
        place_name: "Jigokudani (Hell Valley)",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.35250078398228,
        lng: 142.3746224097603,
        place_name: "Furano",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 42.49471097484324,
        lng: 141.14403370542706,
        place_name: "Noboribetsu Hot Spring",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 41.82701198213221,
        lng: 140.91060444105347,
        place_name: "Hakodate",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.07153759511961,
        lng: 141.368923131282,
        place_name: "Sapporo Beer Museum",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.33817108186105,
        lng: 142.36083695413467,
        place_name: "Furano Delice",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.057942552491184,
        lng: 141.34382990396676,
        place_name: "Hotei",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.05239482500447,
        lng: 141.34750932066947,
        place_name: "Ramen Shingen",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.05479234417283,
        lng: 141.35439440832826,
        place_name: "N Grande Building",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.053320378498434,
        lng: 141.35310615642038,
        place_name: "Susuki no Ichiba",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 43.05489796559919,
        lng: 141.35246066958348,
        place_name: "Jingisukan Daruma",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 2,
      },
      {
        lat: 34.685369960511984,
        lng: 135.52574979074606,
        place_name: "Osaka Castle",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.6657714298757,
        lng: 135.43234582556383,
        place_name: "Universal Studies Japan",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.65638329039308,
        lng: 135.43094444513602,
        place_name: "Tempozan Ferris Wheel",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.654624066546866,
        lng: 135.42898596044233,
        place_name: "Osaka Aquarium Kaiyukan",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.70528293931903,
        lng: 135.51880089007864,
        place_name: "Kema Sakuranomiya Park",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.67248054925658,
        lng: 135.5011280459536,
        place_name: "Shinsaibashi",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.65260506893766,
        lng: 135.5063379893254,
        place_name: "Tsutenkaku",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.70676707965628,
        lng: 135.51156023487073,
        place_name: "Tenjinbashi",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.670476884326746,
        lng: 135.5033835171701,
        place_name: "Mitsutera Galaxy Building 5",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.70308426083614,
        lng: 135.49917164949906,
        place_name: "Hankyu Grand Building",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.66568295024823,
        lng: 135.4994670347979,
        place_name: "Fuji Building",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.66067844511893,
        lng: 135.50303520874184,
        place_name: "Namba Kojimerushi",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.64983037889342,
        lng: 135.50605038160666,
        place_name: "Tengu",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.71354705661214,
        lng: 135.5080098839179,
        place_name: "GRACE Umeda Higashi",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
      {
        lat: 34.70140314873003,
        lng: 135.4982874164889,
        place_name: "Hanshin Department Store Umeda",
        created_at: new Date(),
        updated_at: new Date(),
        area_id: 3,
      },
    ]);
    await queryInterface.bulkInsert("hashtags", [
      {
        name: "CAFE",
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "DESSERTS",
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "FOOD",
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "DRINKS",
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "SIGHTS",
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "MANMADE",
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "SIGHTSEEING",
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "STAY",
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "BEAUTY",
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "OOTD",
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("chatrooms", [
      {
        room_name: "WEEBSSSSSSS",
        active: false,
        host_user_id: 1,
        created_at: new Date("July 18, 2022 03:30:00"),
        updated_at: new Date("July 31, 2022 06:36:30"),
      },
      {
        room_name: "Travelling to Tokyo",
        active: false,
        host_user_id: 1,
        created_at: new Date("July 19, 2022 08:35:00"),
        updated_at: new Date("July 30, 2022 14:40:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pins", null, {});
    await queryInterface.bulkDelete("hashtags", null, {});
    await queryInterface.bulkDelete("chatrooms", null, {});
  },
};
