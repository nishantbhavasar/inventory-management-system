"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "roles",
            [
              {
                id: 1,
                role: "Admin",
              },
              {
                id: 2,
                role: "Manager",
              },
              {
                id: 3,
                role: "User",
              },
            ],
            { transaction }
          ),
        ]);
      });
      // Fix the auto-increment sequence to continue from max(id)
      await queryInterface.sequelize.query(
        `SELECT setval('"roles_id_seq"', (SELECT MAX(id) FROM "roles") + 1);`
      );
    } catch (error) {
      console.log("add-roles : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
    // Reset the sequence
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "roles_id_seq" RESTART WITH 1;`
    );
  },
};
