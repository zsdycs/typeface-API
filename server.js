require('dotenv').config({ path: `${__dirname}/.env` });
const http = require('http');
const { logger } = require('./middleware/logger');
const app = require('./app');

const PORT = process.env.PORT || 8080;
const SERVER = http.createServer(app.callback());

SERVER.listen(PORT, '0.0.0.0', () => {
  logger.info(`Running on port: ${PORT}`);
});
