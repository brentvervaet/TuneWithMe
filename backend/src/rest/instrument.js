const Router = require("@koa/router");
const Joi = require("joi");

const instrumentService = require("../service/instrument");
const tuningService = require("../service/tuning");
const validate = require("../core/validation");
const {requireAuthentication, makeRequireRole} = require("../core/auth");
const Role = require("../core/roles");

//GET
const getAllInstruments = async (ctx) => {
    const {userId, roles} = ctx.state.session;
    const isAdmin = roles.includes(Role.ADMIN);
    ctx.body = await instrumentService.getAll(userId, isAdmin);
};

const getInstrumentById = async (ctx) => {
    ctx.body = await instrumentService.getById(ctx.params.id);
};
getInstrumentById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

const getTuningsByInstrumentId = async (ctx) => {
    ctx.body = await tuningService.getTuningsByInstrumentId(
        Number(ctx.params.instrumentId)
    );
};
getTuningsByInstrumentId.validationScheme = {
    params: Joi.object({
        instrumentId: Joi.number().integer().positive().required(),
    }),
};

const getInstrumentByType = async (ctx) => {
    ctx.body = await instrumentService.getByType(ctx.params.type);
};
getInstrumentByType.validationScheme = {
    body: {
        type: Joi.string(),
    },
};

//POST
const createInstrument = async (ctx) => {
    const newInstrument = await instrumentService.create({
        ...ctx.request.body,
        user_id: ctx.state.session.userId,
    });
    ctx.status = 201;
    ctx.body = newInstrument;
};
createInstrument.validationScheme = {
    body: {
        name: Joi.string().required(),
        type: Joi.string().required(),
        nrOfNotes: Joi.number().integer().positive().required(),
        description: Joi.string().optional(),
    },
};

//PUT
const updateInstrument = async (ctx) => {
    ctx.body = await instrumentService.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
    });
};
updateInstrument.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: {
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        nrOfNotes: Joi.number().integer().positive().optional(),
        description: Joi.string().optional(),

    },
};

//DELETE
const deleteInstrument = async (ctx) => {
    await instrumentService.deleteById(Number(ctx.params.id));
    ctx.status = 204;
};
deleteInstrument.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const deleteTuningByInstrumentId = async (ctx) => {
    await tuningService.deleteById(Number(ctx.params.tuningId));
    ctx.status = 204;
}
deleteTuningByInstrumentId.validationScheme = {
    params: Joi.object({
        tuningId: Joi.number().integer().positive().required(),
        id: Joi.number().integer().positive().required(),
    }),
};

const requireAdmin = makeRequireRole(Role.ADMIN);

/**
 * Install instrument routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/instruments",
    });

    //PUBLIC ROUTES
    router.get(
        "/",
        requireAuthentication,
        validate(getAllInstruments.validationScheme),
        getAllInstruments
    );

    router.get(
        "/:id",
        requireAuthentication,
        validate(getInstrumentById.validationScheme),
        getInstrumentById
    );

    router.get(
        "/:instrumentId/tunings",
        validate(getTuningsByInstrumentId.validationScheme),
        getTuningsByInstrumentId
    );

    //PROTECTED ROUTES
    router.post(
        "/",
        requireAuthentication,
        // requireAdmin,
        validate(createInstrument.validationScheme),
        createInstrument
    );

    router.put(
        "/:id",
        requireAuthentication,
        // requireAdmin,
        validate(updateInstrument.validationScheme),
        updateInstrument
    );

    router.delete(
        "/:id",
        requireAuthentication,
        // requireAdmin,
        validate(deleteInstrument.validationScheme),
        deleteInstrument
    );

    router.delete(
        "/:id/tunings/:tuningId",
        requireAuthentication,
        // requireAdmin,
        validate(deleteTuningByInstrumentId.validationScheme),
        deleteTuningByInstrumentId
    );


    app.use(router.routes()).use(router.allowedMethods());
};
