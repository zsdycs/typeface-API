const { ResolveResponse } = require('../lib/resolveResponse');
const { logger } = require('./logger');
/**
 * Error handler middleware
 *
 * @param   {Object}    ctx       Koa context
 * @param   {function}  next      Koa next function
 * @returns {void}
 */
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || 500;
    ctx.body = ResolveResponse.fail(error);
    logger.error(error);
  }
};
