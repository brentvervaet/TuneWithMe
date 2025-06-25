const { getKnex, tables } = require('../data');
const { getLogger } = require('../core/logging');

//GET
const findAll = async () => {
  getLogger().info('Finding all notes');

  return await getKnex()(tables.note).select().orderBy('frequency', 'ASC');
};

const findById = async (id) => {
  getLogger().info('Finding note by id', { id });
  return await getKnex()(tables.note).where('id', id).first();
};

const findNotesByTuningId = async (tuningId) => {
  getLogger().info("Finding notes for tuning", { tuningId });

  return await getKnex()(tables.tuning_note)
    .select("notes.*","tunings_notes.snaar_index")
    .join("notes", "tunings_notes.note_id", "notes.id")
    .where("tunings_notes.tuning_id", tuningId)
    .orderBy("tunings_notes.snaar_index", "ASC");
};

const findCount = async () => {
  const [count] = await getKnex()(tables.note).count();
  return count['count(*)'];
};

//POST
const create = async ({ name,  frequency }) => {
  try {
    const [id] = await getKnex()(tables.note).insert({
      name,
      frequency,
    });
    return id;
  } catch (err) {
    getLogger().error('Error in create note', { err });
    throw err;
  }
};

//PUT
const updateById = async (id, { name, frequency }) => {
  try {
    await getKnex()(tables.note)
      .where('id', id)
      .update({ name, frequency });
  } catch (err) {
    getLogger().error('Error in update note', { err });
    throw err;
  }
};

//DELETE
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.note).where('id', id).delete();
    return rowsAffected > 0;
  } catch (err) {
    getLogger().error('Error in deleteById', { err });
    throw err;
  }
};

module.exports = {
  findAll,
  findCount,
  findById,
  findNotesByTuningId,
  create,
  updateById,
  deleteById,
};
