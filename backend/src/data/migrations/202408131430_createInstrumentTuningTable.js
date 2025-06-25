const {tables} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.instrument_tuning, (table) => {
            table.increments('id'); // Auto-increment primary key
            table.integer('instrument_id').unsigned().notNullable();

            table
                .foreign('instrument_id', 'fk_instrument_tuning_instrument')
                .references(`${tables.instrument}.id`)
                .onDelete('CASCADE'); // Verwijzing naar instrument
            table.integer('tuning_id').unsigned().notNullable();

            table
                .foreign('tuning_id', 'fk_instrument_tuning_tuning')
                .references(`${tables.tuning}.id`)
                .onDelete('CASCADE'); // Verwijzing naar tuning
        });
    },

    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.instrument_tuning);
    },
};
