// lib/publish/index.js
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const logger = require('../logger');
const config = require('../config');

const packagesPath = path.join(process.cwd(), 'packages');
const configPath = path.join(process.cwd(), 'yap.json');

async function publish(packageName) {
  try {
    logger(`Publishing package: ${packageName}...`);

    // Define the package path
    const packagePath = path.join(packagesPath, packageName);

    // Check if the package exists
    if (!await fs.pathExists(packagePath)) {
      logger(`Package ${packageName} does not exist.`);
      return;
    }

    // Load package.json to ensure it has the necessary fields
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageData = await fs.readJson(packageJsonPath);

    if (!packageData.name || !packageData.version) {
      logger('package.json must have name and version fields.');
      return;
    }

    // Execute 'npm publish' in the package directory
    exec('npm publish', { cwd: packagePath }, (error, stdout, stderr) => {
      if (error) {
        logger(`Error publishing package ${packageName}: ${stderr}`);
        return;
      }
      logger(`Package ${packageName} published successfully!`);
    });
  } catch (error) {
    logger(`Error publishing package ${packageName}: ${error.message}`);
  }
}

module.exports = publish;
