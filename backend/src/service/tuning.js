const ServiceError = require("../core/serviceError");
const tuningRepo = require("../repository/tuning");

const handleDBError = require("./_handleDBError");

//GET
const getAllTunings = async () => {
    const items = await tuningRepo.findAllTunings();
    return {
        items,
        count: items.length,
    };
};

const getTuningsByInstrumentId = async (instrumentId) => {
    const tunings = await tuningRepo.findTuningsByInstrumentId(instrumentId);
    return tunings;
};

const getById = async (id, userId) => {
    const tuning = await tuningRepo.findById(id);
    if (!tuning || tuning.user_id != userId) {
        throw new ServiceError(404, `Tuning with id ${id} not found`);
    }
    return tuning;
};

//POST
const create = async ({name, notes}) => {
    try {
        const id = await tuningRepo.create({name, notes});
        return await getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};
//PUT
const updateById = async (id, {name, notes}) => {
    const tuning = await getById(id);
    if (!tuning) {
        throw new ServiceError(404, `Tuning with id ${id} not found`);
    }
    try {
        await tuningRepo.updateById(id, {name, notes});
        return getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};
//DELETE
const deleteById = async (id) => {
    try {
        const deleted = await tuningRepo.deleteById(id);
        if (!deleted) {
            throw new ServiceError.notFound(`Tuning with id ${id} not found`, {id});
        }
    } catch (err) {
        throw handleDBError(err);
    }
};

module.exports = {
    getAllTunings,
    getTuningsByInstrumentId,
    getById,
    create,
    updateById,
    deleteById,
};
