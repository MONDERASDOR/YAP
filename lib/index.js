// lib/index.js
const install = require('./install');
const update = require('./update');
const remove = require('./remove');
const auth = {
  login: require('../auth/login'),
  register: require('./auth/register')
};
const config = require('./config');
const cache = require('./cache');
const logger = require('./logger');
const errorHandler = require('./error-handler');
const utils = require('./utils');

module.exports = {
  install,
  update,
  remove,
  auth,
  config,
  cache,
  logger,
  errorHandler,
  utils
};
