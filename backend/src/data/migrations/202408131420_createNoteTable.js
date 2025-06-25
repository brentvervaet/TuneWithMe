const {tables} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.note, (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.float('frequency').notNullable();

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.note);
    },
};
