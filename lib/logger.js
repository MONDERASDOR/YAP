// lib/logger.js
const chalk = require('chalk');

function logger(message) {
  console.log(chalk.green(`[YAP] ${message}`));
}

module.exports = logger;
