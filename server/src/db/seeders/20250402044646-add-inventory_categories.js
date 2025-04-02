"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "inventory_categories",
            [
              {
                inventory_id: 1,
                category_id: 1,
              },
              {
                inventory_id: 2,
                category_id: 2,
              },
              {
                inventory_id: 2,
                category_id: 3,
              },
              {
                inventory_id: 3,
                category_id: 2,
              },
              {
                inventory_id: 3,
                category_id: 3,
              },
              {
                inventory_id: 4,
                category_id: 4,
              },
            ],
            { transaction }
          ),
        ]);
      });
    } catch (error) {
      console.log("add-inventory_categories : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("inventory_categories", null, {});
  },
};
