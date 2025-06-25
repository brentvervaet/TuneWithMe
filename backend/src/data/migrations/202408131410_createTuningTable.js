const {tables} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.tuning, (table) => {
            table.increments("id");
            table.string("name", 255).notNullable();
            table.boolean("isCustom").notNullable().defaultTo(false);
            table.jsonb("notes").notNullable(); // Store note IDs as JSON array
            table.integer("instrument_id").unsigned().notNullable();
            table
                .foreign("instrument_id", "fk_tuning_instrument")
                .references(`${tables.instrument}.id`)
                .onDelete("CASCADE");
            table.integer("user_id").unsigned().notNullable();
            table
                .foreign("user_id", "fk_tuning_user")
                .references(`${tables.user}.id`)
                .onDelete("CASCADE"); // Reference to the user who created the tuning
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.tuning);
    },
};
