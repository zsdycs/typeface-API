/* eslint-disable global-require */

const Router = require('koa-router');
const FOLDERS = [require('./typeface')];

const ROUTER = new Router();

// Register all routes + all versions
module.exports = () => {
  FOLDERS.forEach((routeFolder) => {
    routeFolder.forEach((version) => {
      ROUTER.use(version.routes());
    });
  });
  return ROUTER.routes();
};
