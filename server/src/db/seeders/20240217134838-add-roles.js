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
    } catch (error) {
      console.log("add-roles : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
