const {tables} = require('../..');
const Role = require('../../../core/roles');
const {hashPassword} = require("../../../core/password");
module.exports = {
    seed: async (knex) => {
        // Deletes ALL existing entries
        await knex(tables.user).delete();

        const hashedPassword = await hashPassword("Doroth341!-271828");


        // Inserts seed entries
        await knex(tables.user).insert([
            {
                id: 1,
                username: 'admin',
                firstname: 'Admin',
                lastname: 'Admin',
                email: 'admin@hogent.be',
                password_hash:
                    hashedPassword,
                roles: JSON.stringify([Role.ADMIN]),
            },
        ]);
    },
};
