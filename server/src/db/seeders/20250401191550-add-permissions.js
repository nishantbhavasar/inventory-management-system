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
              {
                id:5,
                permission: "READ:USER",
              },
              {
                id:6,
                permission: "CREATE:USER",
              },
              {
                id:7,
                permission: "UPDATE:USER",
              },
              {
                id:8,
                permission: "DELETE:USER",
              },
            ],
            { transaction }
          ),
        ]);
      });
    } catch (error) {
      console.log("add-permission : ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permission", null, {});
  },
};
