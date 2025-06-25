const Router = require('@koa/router');
const spotifyService = require('../service/spotify');

const getTrackOfTheDay = async (ctx) => {
  ctx.body = await spotifyService.getTrackOfTheDay();
};

const router = new Router({
  prefix: '/home',
});

router.get('/spotify/track', getTrackOfTheDay);

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};