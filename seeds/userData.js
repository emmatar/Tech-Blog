const { User } = require('../models');

const userData = [
  {
    name: 'Sal',
    username: 'sal',
    password: 'sal11',
  },
  {
    name: 'Lernantino',
    username: 'lernantino',
    password: 'lernaturn5',
  },
  {
    name: 'Amiko',
    username: 'amiko2k20',
    password: 'amiok7',
  },
];

const seedUser = () => User.bulkCreate(userData, { individualHooks: true });
module.exports = seedUser;
