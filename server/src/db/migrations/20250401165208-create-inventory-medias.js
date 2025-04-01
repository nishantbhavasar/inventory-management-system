'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory_medias', {
      inventory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'inventories',
            // schema: 'schema',
          },
          key: 'id',
        },
        onDelete:'CASCADE'
      },
      media_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'medias',
            // schema: 'schema',
          },
          key: 'id',
        },
        onDelete:'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventory_medias');
  }
};