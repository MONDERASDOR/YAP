// lib/auth/login.js
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../logger');

const usersPath = path.join(process.cwd(), 'users.json');

async function login(username, password) {
  try {
    logger(`Logging in user: ${username}...`);

    // Check if users.json exists
    if (!await fs.pathExists(usersPath)) {
      logger('No users found. Please register first.');
      return;
    }

    // Read users data
    const users = await fs.readJson(usersPath);

    // Find the user
    const user = users.find(u => u.username === username);
    if (!user) {
      logger('User not found.');
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger('Invalid password.');
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, config.secret, { expiresIn: '1h' });

    logger(`Login successful. Your token: ${token}`);
  } catch (error) {
    logger(`Failed to login: ${error.message}`);
  }
}

module.exports = login;