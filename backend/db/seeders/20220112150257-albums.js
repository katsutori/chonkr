'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Albums', [
      {
        name: 'General',
        userId: 1
      },
      {
        name: '2022 Chonks',
        userId: 1
      },
      {
        name: 'General',
        userId: 2
      },
      {
        name: '2022 Chonks',
        userId: 2
      },
      {
        name: 'General',
        userId: 3
      },
      {
        name: '2022 Chonks',
        userId: 3
      },
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Albums', null, {});

  }
};
