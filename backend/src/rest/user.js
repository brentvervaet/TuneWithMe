const Router = require('@koa/router');
const Joi = require('joi');

const userService = require('../service/user');
const validate = require('../core/validation');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');

//LOGIN
const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const token = await userService.login(email, password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

//REGISTER (POST)
const registerUser = async (ctx) => {
  const token = await userService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = token;
};
registerUser.validationScheme = {
  body: {
    firstname: Joi.string().max(255),
    lastname: Joi.string().max(255),
    username: Joi.string().max(255),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(255),
  },
};

//GET
const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};
getAllUsers.validationScheme = null;

const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.state.session.userId);
  ctx.status = 200;
  ctx.body = user;
};
getUserById.validationScheme = {
  params: Joi.object({
    id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().valid('me')),
  }),
};

//PUT
const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
  ctx.body = user;
};
updateUserById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
  body: {
    username: Joi.string().max(255),
    email: Joi.string().email(),
  },
};

//DELETE
const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

//Check if the signed in user can access the given user's information.
const checkUserId = (ctx, next) => {

  const { userId, roles } = ctx.state.session;
  const { id } = ctx.params;


  console.log(id);

  // You can only get our own data unless you're an admin
  if (id!== 'me' && id !== userId && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'You are not allowed to do that',
      {
        code: 'FORBIDDEN',
      },
    );
  }
  return next();
};

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */

//USER ROUTES
module.exports = function installUserRoutes(app) {
  const router = new Router({
    prefix: '/users',
  });

  // PUBLIC ROUTES
  router.post('/login', validate(login.validationScheme), login);
  router.post('/register', validate(registerUser.validationScheme), registerUser);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  // PROTECTED ROUTES
  router.get(
    '/',
    requireAuthentication,
    requireAdmin,
    validate(getAllUsers.validationScheme),
    getAllUsers,
  );

  router.get(
    '/:id',
    requireAuthentication,
    validate(getUserById.validationScheme),
    checkUserId,
    getUserById,
  );

 

  router.put(
    '/:id',
    requireAuthentication,
    validate(updateUserById.validationScheme),
    checkUserId,
    updateUserById,
  );

  router.delete(
    '/:id',
    requireAuthentication,
    validate(deleteUserById.validationScheme),
    checkUserId,
    deleteUserById,
  );

  app.use(router.routes()).use(router.allowedMethods());
};
