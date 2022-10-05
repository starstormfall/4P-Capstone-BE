"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "food",
      },
      {
        name: "sightseeing",
      },
      {
        name: "accomodation",
      },
      {
        name: "fashion",
      },
    ]);
    await queryInterface.bulkInsert("areas", [
      {
        prefecture: "Tokyo",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        prefecture: "Hokkaido",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        prefecture: "Osaka",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("users", [
      {
        name: "test",
        email: "test@test.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Ftest.jpg?alt=media&token=44466334-36a0-4d18-a517-a0a8a20b6349",
        nationality: "Singaporean",
        score: 100,
        last_login: new Date().toDateString(),
        login_streak: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sam O'Shaughnessy",
        email: "samo@samo.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fsamo.jpg?alt=media&token=c6292add-1536-417e-8aca-1e1ef5be218f",
        nationality: "Hong Kong",
        score: 999,
        last_login: new Date().toDateString(),
        login_streak: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ryoji Fujinami",
        email: "ryoji@ryoji.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2F1656691562897.jpg?alt=media&token=9bba3c15-4080-44c5-8918-1d051d385fcb",
        nationality: "Japanese",
        score: 420,
        last_login: new Date().toDateString(),
        login_streak: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ho Ming Sheng",
        email: "ming@ming.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2FMS.webp?alt=media&token=6375f776-19b8-428e-98de-29d048812f39",
        nationality: "Singaporean",
        score: 235,
        last_login: new Date().toDateString(),
        login_streak: 112,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "HB Tan",
        email: "hb@hb.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fhb.jpg?alt=media&token=99b64bfe-b271-450f-a2a8-abc5a8324e2f",
        nationality: "Singaporean",
        score: 314,
        last_login: new Date().toDateString(),
        login_streak: 159,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Anya Forger",
        email: "anya@anya.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Faniyuki-anya-forger-image-55.jpg?alt=media&token=9b712c29-b8ad-4e4c-a348-5173adb286c9",
        nationality: "Japanese",
        score: 690,
        last_login: new Date().toDateString(),
        login_streak: 420,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Foong Leung",
        email: "foong@foong.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Ffoong.jpg?alt=media&token=2b7ac212-d71c-4c67-b216-cf1562c746b9",
        nationality: "Hong Kong",
        score: 998,
        last_login: new Date().toDateString(),
        login_streak: 150,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bryan Luke Tan",
        email: "bryan@bryan.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fbryan.png?alt=media&token=d06fcdee-1cf9-46fd-9056-31d262eb5b96f",
        nationality: "Singaporean",
        score: 997,
        last_login: new Date().toDateString(),
        login_streak: 123,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Allie Yam",
        email: "allie@allie.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fallie.png?alt=media&token=a466a5f3-3203-4069-b8a0-43709dd7f018",
        nationality: "Singaporean",
        score: 99,
        last_login: new Date().toDateString(),
        login_streak: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Darren Tan",
        email: "darren@darren.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fdarren.png?alt=media&token=4ec5e43e-424f-4f90-8974-e7135f88b9cd",
        nationality: "Singaporean",
        score: 98,
        last_login: new Date().toDateString(),
        login_streak: 13,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jermaine Ye",
        email: "jiamin@jiamin.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fjiamin.png?alt=media&token=155f3530-e520-4a49-aabd-da41a74c5a97",
        nationality: "Singaporean",
        score: 97,
        last_login: new Date().toDateString(),
        login_streak: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Monica Jimenez",
        email: "monica@monica.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fmonica.png?alt=media&token=d4708c8a-ce65-41a2-9f3a-1b6de8d234e7",
        nationality: "Singaporean",
        score: 96,
        last_login: new Date().toDateString(),
        login_streak: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Timothy Tan",
        email: "timo@timo.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Ftimo.jpg?alt=media&token=6dc7b363-464e-4ce9-92c0-057951108f60",
        nationality: "Singaporean",
        score: 95,
        last_login: new Date().toDateString(),
        login_streak: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tan Wei Li",
        email: "weili@weili.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fwill.jpg?alt=media&token=af71b4ed-20f5-44e7-8c1c-8783092c1010",
        nationality: "Singaporean",
        score: 94,
        last_login: new Date().toDateString(),
        login_streak: 16,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Leonardo DiCaprio",
        email: "dicaprio@dicaprio.com",
        photo_link:
          "https://firebasestorage.googleapis.com/v0/b/project4-capstone-tdfl.appspot.com/o/users%2Fseed%2Fleonardo.jpg?alt=media&token=881fa3dc-ef67-4c7e-bf64-592178c1a8b4",
        nationality: "American",
        score: 93,
        last_login: new Date().toDateString(),
        login_streak: 17,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("threads", [
      {
        topic: "Best sushi places in Tokyo",
        created_at: new Date("July 17, 2022 03:30:00"),
        updated_at: new Date("July 30, 2022 06:36:30"),
      },
      {
        topic: "Good and affordable food in Osaka",
        created_at: new Date("July 18, 2022 08:35:00"),
        updated_at: new Date("July 29, 2022 14:40:00"),
      },
      {
        topic: "Where to find nice cafes in Tokyo?",
        created_at: new Date("July 26, 2022 09:35:00"),
        updated_at: new Date("August 29, 2022 15:30:00"),
      },
      {
        topic: "Omg this restaurant is SOOOOO LIT!!!!!!!!!!!",
        created_at: new Date("August 9, 2022 16:35:00"),
        updated_at: new Date("September 10, 2022 16:40:00"),
      },
      {
        topic: "This cafe was soooo crowded. I gave up! (Angry)",
        created_at: new Date("August 15, 2022 12:35:00"),
        updated_at: new Date("September 30, 2022 20:50:00"),
      },
      {
        topic: "This cafe in Furano!!!! SO COOOOL!!!!!!!",
        created_at: new Date("September 8, 2022 11:15:00"),
        updated_at: new Date("September 20, 2022 23:20:00"),
      },
      {
        topic: "This restaurant in Tokyo has the best seafood!!",
        created_at: new Date("September 15, 2022 11:15:00"),
        updated_at: new Date("October 1, 2022 12:00:00"),
      },
      {
        topic: "This restaurant's food is soooooo worth the queue!",
        created_at: new Date("September 10, 2022 23:15:00"),
        updated_at: new Date("October 5, 2022 10:30:00"),
      },
      {
        topic: "Best dessert place in Osaka",
        created_at: new Date("July 10, 2022 15:00:00"),
        updated_at: new Date("September 29, 2022 19:23:30"),
      },
      {
        topic: "Best seafood in Hokkaido",
        created_at: new Date("September 01, 2022 21:40:00"),
        updated_at: new Date("October 01, 2022 19:26:30"),
      },
      {
        topic: "Best attractions in Tokyo",
        created_at: new Date("July 01, 2022 19:30:00"),
        updated_at: new Date("August 18, 2022 20:12:30"),
      },
      {
        topic: "Looking for bar recommendations in Tokyo",
        created_at: new Date("July 04, 2022 12:10:00"),
        updated_at: new Date("July 18, 2022 21:04:10"),
      },
      {
        topic: "Relatively unknown night scenery spot in Tokyo",
        created_at: new Date("August 12, 2022 14:15:00"),
        updated_at: new Date("August 28, 2022 22:19:00"),
      },
      {
        topic: "This scenery in Hokkaido BLEW.MY.MIND",
        created_at: new Date("September 02, 2022 20:15:00"),
        updated_at: new Date("September 28, 2022 20:19:00"),
      },
      {
        topic: "YOO Tokyo Skytree is SO GOOD FRFR",
        created_at: new Date("September 05, 2022 15:16:00"),
        updated_at: new Date("September 28, 2022 22:19:00"),
      },
      {
        topic:
          "You're missing out on SOOO much if you don't visit Toyosu Market!",
        created_at: new Date("September 05, 2022 16:20:00"),
        updated_at: new Date("October 04, 2022 20:21:00"),
      },
      {
        topic: "GOTTA COME HERE IN OSAKA!",
        created_at: new Date("August 12, 2022 14:15:00"),
        updated_at: new Date("September 27, 2022 22:19:00"),
      },
      {
        topic:
          "NGL this was the best scenery I have seen in my entire life. And its in Hokkaido",
        created_at: new Date("September 24, 2022 23:22:00"),
        updated_at: new Date("October 08, 2022 18:17:00"),
      },
      {
        topic: "Osaka has this amazing building, I cannot believe my eyes",
        created_at: new Date("September 26, 2022 19:50:00"),
        updated_at: new Date("September 30, 2022 08:16:00"),
      },
      {
        topic: "OMG I am mindblown by this magnificent building in Osaka",
        created_at: new Date("August 24, 2022 23:22:00"),
        updated_at: new Date("October 03, 2022 18:17:00"),
      },
      {
        topic: "Where can I see this anime scene in real life in Tokyo?",
        created_at: new Date("August 06, 2022 15:20:00"),
        updated_at: new Date("September 01, 2022 10:17:00"),
      },
      {
        topic:
          "Where have I been all this time? This place is a MUST visit if you are in Hokkaido",
        created_at: new Date("October 04, 2022 12:25:00"),
        updated_at: new Date("October 05, 2022 06:20:00"),
      },
      {
        topic: "Best accomodations in Osaka",
        created_at: new Date("October 02, 2022 20:25:00"),
        updated_at: new Date("October 08, 2022 10:20:00"),
      },
      {
        topic: "Finding for affordable and really nice hotels to stay in Tokyo",
        created_at: new Date("September 30, 2022 14:18:00"),
        updated_at: new Date("October 03, 2022 08:23:00"),
      },
      {
        topic: "Cheap and clean ryokan in Osaka!!",
        created_at: new Date("September 20, 2022 14:19:00"),
        updated_at: new Date("October 01, 2022 10:21:00"),
      },
      {
        topic: "The breakfast in this hotel is LIT AF!!!!",
        created_at: new Date("September 14, 2022 20:25:00"),
        updated_at: new Date("September 30, 2022 23:20:00"),
      },
      {
        topic:
          "You wouldn't believe if I told you you can have such nice meals as a stay package at this hotel in Tokyo!",
        created_at: new Date("September 08, 2022 12:25:00"),
        updated_at: new Date("September 28, 2022 09:20:00"),
      },
      {
        topic: "I need to find hotels with comfy beds in Osaka",
        created_at: new Date("August 31, 2022 11:41:00"),
        updated_at: new Date("September 15, 2022 19:23:00"),
      },
      {
        topic: "A hotel in Hokkaido with nice scenery outside your room",
        created_at: new Date("August 23, 2022 15:25:00"),
        updated_at: new Date("September 24, 2022 13:24:00"),
      },
      {
        topic: "The facilities in this hotel are INSANE!!!!",
        created_at: new Date("August 16, 2022 17:59:00"),
        updated_at: new Date("September 08, 2022 12:40:00"),
      },
      {
        topic: "How do you even find cheap ryokan with onsen in Osaka?",
        created_at: new Date("August 08, 2022 12:48:00"),
        updated_at: new Date("August 23, 2022 18:32:00"),
      },
      {
        topic: "The service here in this Hokkaido hotel was SO GOOD",
        created_at: new Date("August 01, 2022 01:59:00"),
        updated_at: new Date("August 31, 2022 04:12:00"),
      },
      {
        topic: "Cheap and simple hotels in Tokyo",
        created_at: new Date("July 24, 2022 22:47:00"),
        updated_at: new Date("October 01, 2022 14:45:00"),
      },
      {
        topic: "Hotels with best breakfast views in Hokkaido!!!",
        created_at: new Date("July 14, 2022 23:29:00"),
        updated_at: new Date("September 30, 2022 05:23:00"),
      },
      {
        topic: "Saw this street fashion the other day in Tokyo",
        created_at: new Date("July 14, 2022 23:15:00"),
        updated_at: new Date("July 31, 2022 05:10:00"),
      },
      {
        topic: "Where do I get this brush? I am currently in Hokkaido",
        created_at: new Date("July 25, 2022 12:29:00"),
        updated_at: new Date("August 12, 2022 06:11:00"),
      },
      {
        topic: "How do people dress so nicely in Osaka???",
        created_at: new Date("July 25, 2022 13:30:00"),
        updated_at: new Date("August 11, 2022 07:12:00"),
      },
      {
        topic:
          "This foundation made my skin so much healthier compared to before!",
        created_at: new Date("July 29, 2022 13:34:00"),
        updated_at: new Date("September 14, 2022 08:13:00"),
      },
      {
        topic: "I got my nails done in Osaka!!",
        created_at: new Date("August 30, 2022 14:35:00"),
        updated_at: new Date("September 15, 2022 09:14:00"),
      },
      {
        topic: "Tokyo fashion is in-saneeeeeeeeeeee!!!",
        created_at: new Date("September 19, 2022 15:36:00"),
        updated_at: new Date("October 04, 2022 10:15:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("areas", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("threads", null, {});
  },
};
