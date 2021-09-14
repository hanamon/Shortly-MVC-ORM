'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn('Urls', 'userId', Sequelize.INTEGER);
    // foreign key 연결
    await queryInterface.addConstraint('Urls', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_any_name_you_want',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {

  }
};
