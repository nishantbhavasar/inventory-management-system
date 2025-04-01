'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory_categories', {
      inventory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'inventories',
          },
          key: 'id',
        },
        onDelete:'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id',
        },
        onDelete:'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventory_categories');
  }
};