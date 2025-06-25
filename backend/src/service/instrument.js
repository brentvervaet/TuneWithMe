const ServiceError = require("../core/serviceError");
const instrumentRepo = require("../repository/instrument");

const handleDBError = require("./_handleDBError");

//GET
const getAll = async (user_id, isAdmin) => {
    const items = await instrumentRepo.findAll(user_id, isAdmin);
    return {
        items,
        count: items.length,
    };
};

const getById = async (id) => {
    const instrument = await instrumentRepo.findById(id);

    if (!instrument) {
        throw ServiceError.notFound(`No instrument with id ${id} exists`, {id});
    }
    return instrument;
};


//POST
const create = async ({
                          name,
                          type,
                          nrOfNotes,
                          description,
                          user_id,

                      }) => {
    try {
        const id = await instrumentRepo.create({
            name,
            type,
            nrOfNotes,
            description,
            user_id,
        });
        return getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};

//PUT
const updateById = async (
    id,
    {name, type, nrOfNotes, description}
) => {
    const instrument = await getById(id);
    if (!instrument) {
        throw new ServiceError.notFound(`Instrument with id ${id} not found`);
    }
    try {
        await instrumentRepo.updateById(id, {
            name,
            type,
            nrOfNotes,
            description,

        });
        return getById(id);
    } catch (err) {
        throw handleDBError(err);
    }
};

//DELETE
const deleteById = async (id) => {
    try {
        const deleted = await instrumentRepo.deleteById(id);
        if (!deleted) {
            throw ServiceError.notFound(`No instrument with id ${id} exists`, {id});
        }
    } catch (err) {
        throw handleDBError(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
