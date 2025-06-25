const ServiceError = require('../core/serviceError');
const noteRepo = require('../repository/note');

const handleDBError = require('./_handleDBError');

//GET
const getAll = async () => {
    const items = await noteRepo.findAll();
    return {
        items,
        count: items.length,
    };
};

const getById = async (id) => {
    const note = await noteRepo.findById(id);
    if (!note) {
        throw new ServiceError.notFound(`Note with id ${id} not found`, {id});
    }
    return note;
};

const findNotesByTuningId = async (tuningId) => {
    const notes = await noteRepo.findNotesByTuningId(tuningId);
    if (!notes.length) {
        throw new ServiceError.notFound(`No notes found for tuning with id ${tuningId}`, {tuningId});
    }
    return notes;
};

//POST
const create = async ({name, frequency}) => {
    try {
        const id = await noteRepo.create({
            name,
            frequency,
        });
        return await getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};

//PUT
const updateById = async (id, {name, frequency}) => {
    const noteId = await getById(id);
    if (!noteId) {
        throw new ServiceError.notFound(`Note with id ${id} not found`, {id});
    }
    try {
        await noteRepo.updateById(id, {
            name,
            frequency,
        });
        return getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};

const deleteById = async (id) => {
    const deleted = await noteRepo.deleteById(id);

    if (!deleted) {
        throw new Error(`Note with id ${id} not found`, {id});
    }
};

module.exports = {
    getAll,
    getById,
    findNotesByTuningId,
    create,
    updateById,
    deleteById,
};
