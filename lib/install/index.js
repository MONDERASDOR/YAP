// lib/install/index.js
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const logger = require('../logger');
const config = require('../config');

const packagesPath = path.join(process.cwd(), 'packages');
const configPath = path.join(process.cwd(), 'yap.json');

async function install(packageName) {
  try {
    logger(`Installing package: ${packageName}...`);

    // Fetch the package data from npm registry
    const response = await axios.get(`${config.registry}${packageName}`);
    const packageData = response.data;

    // Ensure the packages directory exists
    await fs.ensureDir(packagesPath);

    // Define the destination path for the package
    const packagePath = path.join(packagesPath, packageName);

    // Simulate saving the package by writing package.json
    await fs.ensureDir(packagePath);
    await fs.writeJson(path.join(packagePath, 'package.json'), packageData, { spaces: 2 });

    // Update yap.json with the new dependency
    const yapConfig = await fs.readJson(configPath);
    yapConfig.dependencies = yapConfig.dependencies || {};
    yapConfig.dependencies[packageName] = packageData.version;
    await fs.writeJson(configPath, yapConfig, { spaces: 2 });

    logger(`Package ${packageName} installed successfully!`);
  } catch (error) {
    logger(`Failed to install package ${packageName}: ${error.message}`);
  }
}

module.exports = install;