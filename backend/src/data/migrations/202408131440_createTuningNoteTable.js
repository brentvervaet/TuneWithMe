const {tables} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.tuning_note, (table) => {
            table.increments('id'); // Auto-increment primary key

            table.integer('tuning_id').unsigned().notNullable();

            table.integer('snaar_index').notNullable(); // Index van de snaar (bijv. 1 voor de eerste snaar)

            table
                .foreign('tuning_id', 'fk_noten_tuning_tuning')
                .references(`${tables.tuning}.id`)
                .onDelete('CASCADE'); // Verwijzing naar tuning
            table.integer('note_id').unsigned().notNullable();

            table
                .foreign('note_id', 'fk_noten_tuning_note')
                .references(`${tables.note}.id`)
                .onDelete('CASCADE'); // Verwijzing naar noot

        });
    },

    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.tuning_note);
    },
};
