const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { requestLogger } = require('./middleware/logger');
const { responseTime, errors } = require('./middleware');
const routes = require('./routes');

const app = new Koa();

// disable console.errors for pino
app.silent = true;

// Error handler
app.use(errors);

app.use(conditional());

app.use(etag());

app.use(bodyParser());

// HTTP header security
app.use(helmet());

// Enable CORS for all routes
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Accept'],
    exposeHeaders: ['Shiguang-API-cache', 'Shiguang-API-response-time'],
  }),
);

// Set header with API response time
app.use(responseTime);

// Request logging
app.use(requestLogger);

// Register routes
app.use(routes());

module.exports = app;
