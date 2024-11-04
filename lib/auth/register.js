// lib/auth/register.js
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const logger = require('../logger');

const usersPath = path.join(process.cwd(), 'users.json');

async function register(username, password) {
  try {
    logger(`Registering user: ${username}...`);

    // Ensure users.json exists
    await fs.ensureFile(usersPath);

    // Read existing users
    let users = [];
    try {
      users = await fs.readJson(usersPath);
    } catch (err) {
      // If file is empty, initialize as empty array
      users = [];
    }

    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      logger('Username already exists. Please choose another one.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };

    // Add to users array
    users.push(newUser);

    // Write back to users.json
    await fs.writeJson(usersPath, users, { spaces: 2 });

    logger('User registered successfully!');
  } catch (error) {
    logger(`Failed to register user: ${error.message}`);
  }
}

module.exports = register;
