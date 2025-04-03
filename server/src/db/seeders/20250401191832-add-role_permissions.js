"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "role_permissions",
            [
              {
                role_id: 1,
                permission_id: 1,
              },
              {
                role_id: 1,
                permission_id: 2,
              },
              {
                role_id: 1,
                permission_id: 3,
              },
              {
                role_id: 1,
                permission_id: 4,
              },
              {
                role_id: 2,
                permission_id: 1,
              },
              {
                role_id: 1,
                permission_id: 2,
              },
            ],
            { transaction }
          ),
        ]);
      });
    } catch (error) {
      console.log("add-role_permissions : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
