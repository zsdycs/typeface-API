const Router = require('koa-router');
const {
  existsSync,
  writeFileSync,
  mkdirSync,
  readFileSync,
  createReadStream,
} = require('fs');
const path = require('path');
const { logger } = require('../../../middleware/logger');
const { ResolveResponse } = require('../../../lib/resolveResponse');
const Fontmin = require('../../../lib/fontmin/index');
const { checkTypefaceParameter } = require('./tool');
const { TypefaceName } = require('../../../lib/constants');

const router = new Router({
  prefix: '/(v1|latest)/typeface',
});

router.post('/', async (ctx) => {
  const { text, typeface } = ctx.request.body;
  // 复制文件到缓存目录

  const fileName = TypefaceName[typeface];

  checkTypefaceParameter({ text, typeface });

  const tmpFile = path.resolve(`./.tmp/${fileName}`);
  const tmpPath = path.resolve('./.tmp/');
  const sourceFile = path.resolve(`./fontSource/${fileName}`);

  if (existsSync(tmpFile)) {
    writeFileSync(tmpFile, readFileSync(sourceFile));
  } else if (existsSync(tmpPath)) {
    writeFileSync(tmpFile, readFileSync(sourceFile));
  } else {
    mkdirSync(tmpPath);
    writeFileSync(tmpFile, readFileSync(sourceFile));
  }

  const fontmin = new Fontmin().src(tmpFile);
  fontmin.use(
    Fontmin.glyph({
      trim: false,
      text,
    }),
  );
  fontmin.dest(tmpPath);

  try {
    const error = await new Promise((resolve, reject) => {
      fontmin.run((errors) => {
        if (errors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });

    if (error) {
      ctx.status = 500;
      ctx.body = ResolveResponse.fail(error);
    } else {
      ctx.status = 200;
      ctx.body = createReadStream(tmpFile);
    }
  } catch (error) {
    ctx.status = error.statusCode || 500;
    ctx.body = ResolveResponse.fail(error);
    logger.error(error);
  }
});

module.exports = router;
