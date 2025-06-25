const Router = require('@koa/router');
const Joi = require('joi');

const noteService = require('../service/note');
const validate = require('../core/validation');
const {requireAuthentication, makeRequireRole} = require('../core/auth');
const Role = require('../core/roles');

//GET
const getAllNotes = async (ctx) => {
    ctx.body = await noteService.getAll();
};
getAllNotes.validationScheme = null;

const getNoteById = async (ctx) => {
    ctx.body = await noteService.getById(ctx.params.id);
};
getNoteById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

//POST
const createNote = async (ctx) => {
    const newNote = await noteService.create({
        ...ctx.request.body,
    });
    ctx.status = 201;
    ctx.body = newNote;
};
createNote.validationScheme = {
    body: {
        name: Joi.string(),
        frequency: Joi.number().positive().max(20000).min(0).required(),
    },
};

//PUT
const updateNote = async (ctx) => {
    ctx.body = await noteService.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
    });
};
updateNote.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
    body: {
        name: Joi.string().optional(),
        frequency: Joi.number().positive().max(20000).min(0).optional(),
    },
};

//DELETE
const deleteNote = async (ctx) => {
    ctx.body = await noteService.deleteById(ctx.params.id);
    ctx.status = 204;

};
deleteNote.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive(),
    }),
};

const requireAdmin = makeRequireRole(Role.ADMIN);

/**
 * Install note routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/notes',
    });
    router.get(
        '/',
        // requireAuthentication,
        validate(getAllNotes.validationScheme),
        getAllNotes,
    );
    router.get(
        '/:id',
        // requireAuthentication,
        validate(getNoteById.validationScheme),
        getNoteById,
    );
    router.post(
        '/',
        requireAuthentication,
        requireAdmin,
        validate(createNote.validationScheme),
        createNote,
    );
    router.put(
        '/:id',
        requireAuthentication,
        requireAdmin,
        validate(updateNote.validationScheme),
        updateNote,
    );
    router.delete(
        '/:id',
        requireAuthentication,
        requireAdmin,
        validate(deleteNote.validationScheme),
        deleteNote,
    );

    app.use(router.routes()).use(router.allowedMethods());
};
