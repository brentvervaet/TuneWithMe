const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments("id");
      table.string("lastname", 255).notNullable();
      table.string("firstname", 255).notNullable();

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
