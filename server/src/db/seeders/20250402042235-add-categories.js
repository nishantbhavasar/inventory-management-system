"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "categories",
            [
              {
                id: 1,
                category_name: "Cloths",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                category_name: "Electronics",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 3,
                category_name: "Home Appliances",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 4,
                category_name: "Stastationery",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            { transaction }
          ),
        ]);
      });
    } catch (error) {
      console.log("add-categories : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
