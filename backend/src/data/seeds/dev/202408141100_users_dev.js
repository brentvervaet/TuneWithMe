const { tables } = require('../..');
const Role = require('../../../core/roles');
module.exports = {
  seed: async (knex) => {
    // Deletes ALL existing entries
    await knex(tables.user).delete();

    // Inserts seed entries
    await knex(tables.user).insert([
      {
        id: 1,
        username: 'admin',
        firstname: 'Admin',
        lastname: 'Admin',
        email: 'admin@email.com',
        password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.ADMIN]),
      },
      {
        id: 2,
        username: 'user',
        firstname: 'User',
        lastname: '1',
        email: 'user1@email.com',
        password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
      {
        id: 3,
        username: 'Zelo',
        firstname: 'Brent',
        lastname: 'Vervaet',
        email: 'brent.vervaet@icloud.com',
        password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
    ]);
  },
};
