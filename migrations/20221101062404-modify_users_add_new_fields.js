'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'isAdmin', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
    ])
  }
}