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
    } catch (error) {
      console.log('add-user : ', error);      
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
