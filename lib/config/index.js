// lib/config/index.js
const fs = require('fs-extra');
const path = require('path');

const configPath = path.join(process.cwd(), 'yap.json');
let config = {};

async function loadConfig() {
  try {
    config = await fs.readJson(configPath);
  } catch (error) {
    console.error(`Failed to load config: ${error.message}`);
    process.exit(1);
  }
}

loadConfig();

module.exports = config;
