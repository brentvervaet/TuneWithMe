const Router = require('@koa/router');

const installUserRoutes = require('./user');
const installInstrumentRouter = require('./instrument');
const installNoteRouter = require('./note');
const installTuningRouter = require('./tuning');
const installHealthRouter = require('./health');
const installSpotifyRouter = require('./spotify');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installUserRoutes(router);
  installInstrumentRouter(router);
  installNoteRouter(router);
  installTuningRouter(router);
  installHealthRouter(router);
  installSpotifyRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
