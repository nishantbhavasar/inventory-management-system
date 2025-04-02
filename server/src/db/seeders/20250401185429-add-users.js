"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.transaction(async (transaction) => {
        return Promise.all([
          await queryInterface.bulkInsert(
            "users",
            [
              {
                id: 1,
                name:"Admin",
                email: "admin@gmail.com",
                password: "$2b$10$KSwFizdaAbeWzbgXSdzC3e1hIBfj1b4qWNyi1kcZ7agIrISwXAim6",
                role_id: 1,
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 2,
                name:'Manager',
                email: "manager@gmail.com",
                password: "$2b$10$KSwFizdaAbeWzbgXSdzC3e1hIBfj1b4qWNyi1kcZ7agIrISwXAim6",
                role_id: 2,
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 3,
                name:'User',
                email: "user@gmail.com",
                password: "$2b$10$KSwFizdaAbeWzbgXSdzC3e1hIBfj1b4qWNyi1kcZ7agIrISwXAim6",
                role_id: 3,
                is_active: true,
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
        `SELECT setval('"users_id_seq"', (SELECT MAX(id) FROM "users") + 1);`
      );
    } catch (error) {
      console.log('add-user : ', error);      
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    // Reset the sequence
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "users_id_seq" RESTART WITH 1;`
    );
  },
};
