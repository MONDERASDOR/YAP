// lib/remove/index.js
const fs = require('fs-extra');
const path = require('path');
const logger = require('../logger');
const config = require('../config');

const packagesPath = path.join(process.cwd(), 'packages');
const configPath = path.join(process.cwd(), 'yap.json');

async function remove(packageName) {
  try {
    logger(`Removing package: ${packageName}...`);

    // Define the package path
    const packagePath = path.join(packagesPath, packageName);

    // Check if package exists
    if (!await fs.pathExists(packagePath)) {
      logger(`Package ${packageName} is not installed.`);
      return;
    }

    // Remove the package directory
    await fs.remove(packagePath);

    // Update yap.json by removing the dependency
    const yapConfig = await fs.readJson(configPath);
    if (yapConfig.dependencies && yapConfig.dependencies[packageName]) {
      delete yapConfig.dependencies[packageName];
      await fs.writeJson(configPath, yapConfig, { spaces: 2 });
    }

    logger(`Package ${packageName} removed successfully!`);
  } catch (error) {
    logger(`Failed to remove package ${packageName}: ${error.message}`);
  }
}

module.exports = remove;