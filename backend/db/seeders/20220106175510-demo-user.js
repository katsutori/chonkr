'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'demo2@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('123456'),
        },
        {
          email: 'demo3@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('123456'),
        }], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
