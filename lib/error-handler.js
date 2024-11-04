// lib/error-handler.js
const chalk = require('chalk');

function handleError(error) {
  console.error(chalk.red(`Error: ${error.message}`));
}

module.exports = handleError;
