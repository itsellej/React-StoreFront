const { Pool } = require('pg');
const { config } = require('../config/config')
const pool = new Pool(config.database);

const clearTestUserTable = async () => {
  try {
    const result = await pool.query('DELETE FROM users');
    return result;
  } catch (error) {
    return error;
  }
}

const addNewUser = async (username, firstname, lastname, email, password) => {
  try {
    const result = await pool.query('INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)', [username, firstname, lastname, email, password]);
    return result;
  } catch (error) {
    return error;
  }
}

const checkEmailExists = async (email) => {
  try {
    const result = await pool.query('SELECT EXISTS(SELECT 1 from users WHERE email = $1)', [email])
    return result.rows[0].exists
  } catch (error) {
    return error;
  }
}

const checkUsernameExists = async (username) => {
  try {
    const result = await pool.query('SELECT EXISTS(SELECT 1 from users WHERE username= $1)', [username]);
    return result.rows[0].exists
  } catch (error) {
    return error;
  }
}

const checkUsernamePassword = async (username, password) => {
  try {
    const result = await pool.query('SELECT EXISTS(SELECT 1 from users WHERE username = $1 AND password = $2)', [username, password]);
    return result.rows[0].exists
  } catch (error) {
    return error;
  }
}

module.exports = { clearTestUserTable, addNewUser, checkEmailExists, checkUsernameExists, checkUsernamePassword }