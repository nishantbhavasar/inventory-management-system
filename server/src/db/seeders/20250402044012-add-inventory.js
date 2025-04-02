"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "inventories",
            [
              {
                id: 1,
                name: "Blue T-Shirt",
                description:'Denim Blue T-Shirt For Summer Collection. Best Price',
                price:299.99,
                quantity:50,
                created_by:1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                name: "Samsung AC",
                description:'Samsung AC 4-Start Ultra Cooling 4-Ways Air, Best Air Filter & Air Cleaner.',
                price:43000,
                quantity:5,
                created_by:1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 3,
                name: "Bajaj Fan",
                description:'Bajaj Fan 1000 RPM Speed In build Light in center & Best for summer',
                price:1899.99,
                quantity:10,
                created_by:1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 4,
                name: "Classmat Notebook",
                description:'Smoothest Page write your luck on your own book and get extra mark for good hand writing 1000-page.',
                price:100,
                quantity:100,
                created_by:2,
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
        `SELECT setval('"inventories_id_seq"', (SELECT MAX(id) FROM "inventories") + 1);`
      );
    } catch (error) {
      console.log("add-inventories : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("inventories", null, {});
    // Reset the sequence
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "inventories_id_seq" RESTART WITH 1;`
    );
  },
};
