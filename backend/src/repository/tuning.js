const {getKnex, tables} = require("../data");
const {getLogger} = require("../core/logging");

//GET
const findAllTunings = async () => {
    return await getKnex()(tables.tuning)
        .select()
        // .where('isCustom', false)
        .orderBy("name", "ASC");
};

const findTuningsByInstrumentId = async (instrumentId) => {
    getLogger().info("Finding all tunings for instrument", {instrumentId});
    return await getKnex()(tables.tuning)
        .select("tunings.*")
        .join("instruments_tunings", "tunings.id", "instruments_tunings.tuning_id")
        .where("instruments_tunings.instrument_id", instrumentId)
        .orderBy("tunings.name", "ASC");
};

const findCount = async () => {
    const [count] = await getKnex()(tables.tuning).count();
    return count["count(*)"];
};

const findById = async (id) => {
    getLogger().info("Finding tuning by id", {id});
    return await getKnex()(tables.tuning).where("id", id).first();
};

//POST
const create = async ({name, notes}) => {
    try {
        const [id] = await getKnex()(tables.tuning).insert({name, notes});
        return id;
    } catch (err) {
        getLogger().error("Error in create tuning", {err});
        throw err;
    }
};

const createCustom = async ({name, notes}) => {
    try {
        const [id] = await getKnex()(tables.tuning).insert({
            name,
            notes,
            isCustom: true,
        });
        return id;
    } catch (err) {
        getLogger().error("Error in create custom tuning", {err});
        throw err;
    }
};

//PUT
const updateById = async (id, {name, notes}) => {
    try {
        await getKnex()(tables.tuning).where("id", id).update({name, notes});
    } catch (err) {
        getLogger().error("Error in update tuning", {err});
        throw err;
    }
};
//DELETE
const deleteById = async (id /*userId*/) => {
    try {
        const rowsAffected = await getKnex()(tables.tuning)
            .where("id", id)
            // .andWhere('user_id', userId)
            .delete();

        return rowsAffected > 0;
    } catch (err) {
        getLogger().error("Error in delete tuning", {err});
        throw err;
    }
};

module.exports = {
    findAllTunings,
    findTuningsByInstrumentId,
    findCount,
    findById,
    create,
    createCustom,
    updateById,
    deleteById,
};
