const {tables} = require('../..');
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
                email: 'admin@hogent.be',
                password_hash:
                    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.ADMIN]),
            },
        ]);
    },
};
