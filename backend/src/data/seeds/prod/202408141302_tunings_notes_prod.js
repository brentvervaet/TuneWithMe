const { tables } = require("../..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.tuning_note).delete();
    await knex.raw(`ALTER TABLE ${tables.tuning_note} AUTO_INCREMENT = 1`);


    // Fetch all tunings
    const tunings = await knex(tables.tuning).select("id", "notes");

    // Generate the tuning_note seed data
    const tuningNotes = [];
    tunings.forEach((tuning) => {
      try {
        // Check if notes is a string, if not, convert it to a JSON string
        const notes =
          typeof tuning.notes === "string"
            ? JSON.parse(tuning.notes)
            : tuning.notes;
        notes.forEach((note_id, index) => {
          tuningNotes.push({
            tuning_id: tuning.id,
            note_id,
            snaar_index: index + 1,
          });
        });
      } catch (error) {
        console.error(
          `Error parsing notes for tuning ID ${tuning.id}:`,
          tuning.notes
        );
        throw error;
      }
    });

    // Insert the tuning_note seed data
    await knex(tables.tuning_note).insert(tuningNotes);

    //   await knex(tables.tuning_note).delete();
    //   await knex(tables.tuning_note).insert([
    //     { tuning_id: 1, note_id: 20, snaar_index: 1 },
    //     { tuning_id: 1, note_id: 25, snaar_index: 2 },
    //     { tuning_id: 1, note_id: 30, snaar_index: 3 },
    //     { tuning_id: 1, note_id: 35, snaar_index: 4 },
    //     { tuning_id: 1, note_id: 39, snaar_index: 5 },
    //     { tuning_id: 1, note_id: 44, snaar_index: 6 },
    //     { tuning_id: 3, note_id: 19, snaar_index: 1 },
    //     { tuning_id: 3, note_id: 24, snaar_index: 2 },
    //     { tuning_id: 3, note_id: 30, snaar_index: 3 },
    //     { tuning_id: 3, note_id: 35, snaar_index: 4 },
    //     { tuning_id: 3, note_id: 39, snaar_index: 5 },
    //     { tuning_id: 3, note_id: 43, snaar_index: 6 },
    //   ]);
  },
};
