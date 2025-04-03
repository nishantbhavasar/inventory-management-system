"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "permissions",
            [
              {
                id:1,
                permission: "READ:INVENTORY",
              },
              {
                id:2,
                permission: "CREATE:INVENTORY",
              },
              {
                id:3,
                permission: "UPDATE:INVENTORY",
              },
              {
                id:4,
                permission: "DELETE:INVENTORY",
              },
            ],
            { transaction }
          ),
        ]);
      });
      // Fix the auto-increment sequence to continue from max(id)
      await queryInterface.sequelize.query(
        `SELECT setval('"permissions_id_seq"', (SELECT MAX(id) FROM "permissions") + 1);`
      );
    } catch (error) {
      console.log("add-permission : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
    // Reset the sequence
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "permissions_id_seq" RESTART WITH 1;`
    );
  },
};
