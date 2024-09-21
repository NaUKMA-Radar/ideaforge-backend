const { prisma } = require('../utils/prisma.utils');

module.exports = {
  async up() {
    const data = [{ name: 'Credentials' }, { name: 'Google' }];

    await prisma.userRegistrationMethod.createMany({ data });
  },

  async down() {
    await prisma.userRegistrationMethod.deleteMany();
  },
};
