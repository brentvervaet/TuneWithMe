const Router = require("@koa/router");
const Joi = require("joi");

const tuningService = require("../service/tuning");
const noteService = require("../service/note");
const validate = require("../core/validation");
const {requireAuthentication} = require("../core/auth");
const {getAll} = require("../service/instrument");

//GET
const getAllTunings = async (ctx) => {
    ctx.body = await tuningService.getAllTunings();
};
getAllTunings.validationScheme = null;

const getTuningById = async (ctx) => {
    ctx.body = await tuningService.getById(
        Number(ctx.params.id),
        ctx.state.session.userId
    );
};
getTuningById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const getNotesByTuningId = async (ctx) => {
    ctx.body = await noteService.findNotesByTuningId(ctx.params.tuningId);
};
getNotesByTuningId.validationScheme = {
    params: Joi.object({
        tuningId: Joi.number().integer().positive().required(),
    }),
};


//POST
const createTuning = async (ctx) => {
    const newTuning = await tuningService.create({
        ...ctx.request.body,
        userId: ctx.state.session.userId,
    });
    ctx.status = 201;
    ctx.body = newTuning;
};
createTuning.validationScheme = {
    body: {
        name: Joi.string(),
        notes: Joi.array().items(Joi.number().integer().min(0).max(127)),
    },
};

//PUT
const updateTuning = async (ctx) => {
    ctx.body = await tuningService.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
        userId: ctx.state.session.userId,
    });
};
updateTuning.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().min(1).required(),
    }),
    body: {
        name: Joi.string(),
        notes: Joi.array().items(Joi.number().integer().min(0).max(127)),
    },
};

//DELETE
const deleteTuning = async (ctx) => {
    await tuningService.deleteById(
        Number(ctx.params.id)
        // ctx.state.session.userId,
    );
    ctx.status = 204;
};
deleteTuning.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

/**
 * Install tuning routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/tunings",
    });
    //PUBLIC ROUTES
    router.get("/", validate(getAllTunings.validationScheme), getAllTunings);
    //PROTECTED ROUTES
    router.get(
        "/:id",
        // requireAuthentication,
        validate(getTuningById.validationScheme),
        getTuningById
    );

    router.get(
        "/:tuningId/notes",
        // requireAuthentication,
        validate(getNotesByTuningId.validationScheme),
        getNotesByTuningId
    );

    router.post(
        "/custom",
        // requireAuthentication,
        validate(createTuning.validationScheme),
        createTuning
    );
    router.put(
        "/:id",
        // requireAuthentication,
        validate(updateTuning.validationScheme),
        updateTuning
    );
    router.delete(
        "/:id",
        // requireAuthentication,
        validate(deleteTuning.validationScheme),
        deleteTuning
    );

    app.use(router.routes()).use(router.allowedMethods());
};
