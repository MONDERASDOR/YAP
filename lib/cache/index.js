// lib/cache/index.js
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const logger = require('../logger');

const cachePath = path.join(process.cwd(), config.cache || 'yap-cache');

async function cachePackage(packageName, packageData) {
  try {
    const packageCachePath = path.join(cachePath, packageName);
    await fs.ensureDir(packageCachePath);
    await fs.writeJson(path.join(packageCachePath, 'package.json'), packageData, { spaces: 2 });
    logger(`Cached package: ${packageName}`);
  } catch (error) {
    logger(`Failed to cache package ${packageName}: ${error.message}`);
  }
}

module.exports = {
  cachePackage
};
