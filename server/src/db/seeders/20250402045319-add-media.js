"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "medias",
            [
              {
                id: 1,
                type: "IMAGE",
                url: "https://i.ibb.co/chHLTw2Q/2207-q803-005-F-m012-c5-air-conditioner-realistic-set.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                type: "IMAGE",
                url: "https://i.ibb.co/RpM8SSXJ/ac-1.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 3,
                type: "IMAGE",
                url: "https://i.ibb.co/fGt1sPXn/fan-2.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 4,
                type: "IMAGE",
                url: "https://i.ibb.co/gZyxPyt1/fan-1.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 5,
                type: "IMAGE",
                url: "https://i.ibb.co/8L4ZdSt5/blue-tshirt-2.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 6,
                type: "IMAGE",
                url: "https://i.ibb.co/9k3kHkrq/blue-tshirt-1.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 7,
                type: "IMAGE",
                url: "https://i.ibb.co/Xx0Fqfgf/book-2.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 8,
                type: "IMAGE",
                url: "https://i.ibb.co/YHT8vXk/book-1.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            { transaction }
          ),
        ]);
      });
      // Fix the auto-increment sequence to continue from max(id)
      await queryInterface.sequelize.query(
        `SELECT setval('"medias_id_seq"', (SELECT MAX(id) FROM "medias") + 1);`
      );
    } catch (error) {
      console.log("add-medias : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("medias", null, {});
    // Reset the sequence
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "medias_id_seq" RESTART WITH 1;`
    );
  },
};
