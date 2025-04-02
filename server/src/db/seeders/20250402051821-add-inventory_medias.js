"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "inventory_medias",
            [
              {
                media_id:1,
                inventory_id:2,
              },
              {
                media_id:2,
                inventory_id:2,
              },
              {
                media_id: 3,
                inventory_id:3,
              },
              {
                media_id: 4,
                inventory_id:3,
              },
              {
                media_id: 5,
                inventory_id:1,
              },
              {
                media_id: 6,
                inventory_id:1,
              },
              {
                media_id: 7,
                inventory_id:4,
              },
              {
                media_id: 8,
                inventory_id:4,
              },
            ],
            { transaction }
          ),
        ]);
      });
    } catch (error) {
      console.log("add-inventory_medias : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("inventory_medias", null, {});
  },
};
