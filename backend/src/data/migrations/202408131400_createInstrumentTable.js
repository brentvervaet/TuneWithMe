const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.instrument, (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.unique('name', 'idx_instrument_name_unique');
      table.string('type', 255);
      table.integer('nrOfNotes').notNullable();
      table.string('description', 255);

      table.integer('user_id').unsigned().notNullable();
      table
      .foreign('user_id','fk_instrument_user')
      .references(`${tables.user}.id`)
      .onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.instrument);
  },
};
