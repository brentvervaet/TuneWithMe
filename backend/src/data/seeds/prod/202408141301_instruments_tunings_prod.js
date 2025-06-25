const { tables } = require("../..");
module.exports = {
  seed: async (knex) => {
    await knex(tables.instrument_tuning).delete();
    await knex.raw(`ALTER TABLE ${tables.instrument_tuning} AUTO_INCREMENT = 1`);


    // Fetch all tunings
    const tunings = await knex(tables.tuning).select("id", "instrument_id");

    // Generate the joined table seed data
    const instrumentTunings = tunings.map((tuning) => ({
      instrument_id: tuning.instrument_id,
      tuning_id: tuning.id,
    }));

    // Insert the joined table seed data
    await knex(tables.instrument_tuning).insert(instrumentTunings);
  },
};
