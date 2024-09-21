const { prisma } = require('../utils/prisma.utils');
const { PasswordService } = require('../utils/password.service');

const passwordService = new PasswordService(
  process.env.USER_PASSWORD_SALT_PREFIX || '',
  process.env.USER_PASSWORD_SALT_SUFFIX || '',
);

module.exports = {
  async up() {
    const userRegistrationMethods = await prisma.userRegistrationMethod.findMany();

    const data = [
      {
        userRegistrationMethodId: userRegistrationMethods[0].id,
        firstName: 'Kyrylo',
        lastName: 'Gorokhovsky',
        email: 'kyrylo.gorokhovsky@gmail.com',
        password: await passwordService.hash('#Manager'),
      },
      {
        userRegistrationMethodId: userRegistrationMethods[1].id,
        firstName: 'Petro',
        lastName: 'Yaremenko',
        email: 'petro.yaremenko@gmail.com',
        password: await passwordService.hash('#BBCIsBritishBroadcastingCorporation'),
      },
      {
        userRegistrationMethodId: userRegistrationMethods[0].id,
        firstName: 'Illia',
        lastName: 'Biloverbenko',
        email: 'illia.biloverbenko@gmail.com',
        password: await passwordService.hash('#Password123'),
      },
      {
        userRegistrationMethodId: userRegistrationMethods[0].id,
        firstName: 'Nadiia',
        lastName: 'Yemets',
        email: 'nadiia.yemets@gmail.com',
        password: await passwordService.hash('#Password321'),
      },
      {
        userRegistrationMethodId: userRegistrationMethods[1].id,
        firstName: 'Oleksandr',
        lastName: 'Igumnov',
        email: 'oleksandr.igumnov@gmail.com',
        password: await passwordService.hash('1#Ab4ob8a8'),
      },
    ];

    await prisma.user.createMany({ data });
  },

  async down() {
    await prisma.user.deleteMany();
  },
};
