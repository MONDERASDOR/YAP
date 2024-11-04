#!/usr/bin/env node

const { install } = require('../lib/install');
const { update } = require('../lib/update');
const { remove } = require('../lib/remove');
const auth = require('../lib/auth');
const logger = require('../lib/logger');

// Parse command and arguments from process.argv
const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

// Function to display help
function displayHelp() {
  console.log(`
    Usage: yap <command> [options]
    
    Commands:
      install <package>            Install a package
      update <package>             Update a package
      remove <package>             Remove a package
      login <username> <password>  Login to YAP
      register <username> <password> Register a new user
      help                         Display this help message
  `);
}

// Execute the correct function based on the command
async function executeCommand() {
  try {
    switch (command) {
      case 'install':
        if (commandArgs.length !== 1) {
          console.error('Usage: yap install <package>');
          return;
        }
        await install(commandArgs[0]);
        break;

      case 'update':
        if (commandArgs.length !== 1) {
          console.error('Usage: yap update <package>');
          return;
        }
        await update(commandArgs[0]);
        break;

      case 'remove':
        if (commandArgs.length !== 1) {
          console.error('Usage: yap remove <package>');
          return;
        }
        await remove(commandArgs[0]);
        break;

      case 'login':
        if (commandArgs.length !== 2) {
          console.error('Usage: yap login <username> <password>');
          return;
        }
        await auth.login(commandArgs[0], commandArgs[1]);
        break;

      case 'register':
        if (commandArgs.length !== 2) {
          console.error('Usage: yap register <username> <password>');
          return;
        }
        await auth.register(commandArgs[0], commandArgs[1]);
        break;

      case 'help':
      default:
        displayHelp();
        break;
    }
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
}

// Run the command
executeCommand();
