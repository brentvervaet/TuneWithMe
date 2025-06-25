const {getKnex, tables} = require("../data");
const {getLogger} = require("../core/logging");

//GET
const findAll = async (user_id, isAdmin = false) => {
    getLogger().info("Finding all instruments");

    const query = getKnex()(tables.instrument)
        .select("instruments.*")
        .count("instruments_tunings.tuning_id as tuningCount")
        .leftJoin(
            "instruments_tunings",
            "instruments.id",
            "instruments_tunings.instrument_id"
        )
        .groupBy("instruments.id")
        .orderBy("instruments.name", "ASC");

    if (!isAdmin) {
        query.where(function () {
            this.where("instruments.user_id", user_id).orWhere("instruments.user_id", 1);
        });
    }

    return await query;
};

const findCount = async () => {
    const [count] = await getKnex()(tables.instrument).count();
    return count["count(*)"];
};

const findById = async (id) => {
    getLogger().info("Querying transaction by id", {id});
    return await getKnex()(tables.instrument).where("id", id).first();
};

const create = async ({
                          name,
                          type,
                          nrOfNotes,
                          description,
                          user_id,
                      }) => {
    try {
        const [id] = await getKnex()(tables.instrument).insert({
            name,
            type,
            nrOfNotes,
            description,
            user_id,
        });
        return id;
    } catch (err) {
        getLogger().error("Error in create", {err});
        throw err;
    }
};

//PUT
const updateById = async (
    id,
    {name, type, nrOfNotes, description}
) => {
    try {
        getLogger().info("Updating instrument by id", {
            id,
            name,
            type,
            nrOfNotes,
            description,
        });
        await getKnex()(tables.instrument)
            .update({name, type, nrOfNotes, description})
            .where("id", id);
        return id;
    } catch (err) {
        getLogger().error("Error in updateById", {err});
        throw err;
    }
};

//DELETE
const deleteById = async (id) => {
    try {
        const rowsAffected = await getKnex()(tables.instrument)
            .delete()
            .where("id", id);
        return rowsAffected > 0;
    } catch (err) {
        getLogger().error("Error in deleteById", {err});
        throw err;
    }
};

module.exports = {
    //GET
    findById,
    findAll,
    findCount,
    //POST
    create,
    //PUT
    updateById,
    //DELETE
    deleteById,
};
