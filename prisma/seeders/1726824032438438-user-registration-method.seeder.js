const { prisma } = require('../utils/prisma.utils');

module.exports = {
  async up() {
    const data = [{ name: 'credentials' }, { name: 'google' }];

    await prisma.userRegistrationMethod.createMany({ data });
  },

  async down() {
    await prisma.userRegistrationMethod.deleteMany();
  },
};
