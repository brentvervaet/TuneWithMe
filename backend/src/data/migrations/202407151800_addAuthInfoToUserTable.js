const {tables} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.alterTable(tables.user, (table) => {
            table.string("email").notNullable();
            table.string("username").notNullable();

            table.string("password_hash").notNullable();

            table.jsonb("roles").notNullable();

            table.unique("email", "idx_user_email_unique");
            table.unique("username", "idx_user_username_unique");
        });
    },
    down: (knex) => {
        return knex.schema.alterTable(tables.user, (table) => {
            table.dropColumns("email", "password_hash", "roles");
        });
    },
};
