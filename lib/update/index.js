// lib/update/index.js
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const logger = require('../logger');
const config = require('../config');

const packagesPath = path.join(process.cwd(), 'packages');
const configPath = path.join(process.cwd(), 'yap.json');

async function update(packageName) {
  try {
    logger(`Updating package: ${packageName}...`);

    // Fetch the latest package data from npm registry
    const response = await axios.get(`${config.registry}${packageName}`);
    const latestVersion = response.data['dist-tags'].latest;

    // Define the package path
    const packagePath = path.join(packagesPath, packageName, 'package.json');

    // Check if package is already installed
    if (!await fs.pathExists(packagePath)) {
      logger(`Package ${packageName} is not installed.`);
      return;
    }

    // Read the current package.json
    const currentPackage = await fs.readJson(packagePath);

    if (currentPackage.version === latestVersion) {
      logger(`Package ${packageName} is already up to date.`);
      return;
    }

    // Update the package.json with the latest version
    currentPackage.version = latestVersion;
    await fs.writeJson(packagePath, currentPackage, { spaces: 2 });

    // Update yap.json with the new version
    const yapConfig = await fs.readJson(configPath);
    yapConfig.dependencies[packageName] = latestVersion;
    await fs.writeJson(configPath, yapConfig, { spaces: 2 });

    logger(`Package ${packageName} updated to version ${latestVersion}!`);
  } catch (error) {
    logger(`Failed to update package ${packageName}: ${error.message}`);
  }
}

module.exports = update;
