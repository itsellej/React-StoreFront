const { Pool } = require('pg');
const { config } = require('../config/config')
const pool = new Pool(config.database);

const clearTestUserTable = async () => {
  try {
    await pool.query('DELETE FROM users')
    return 'Successfully cleared users table in shopfronttest database';
  } catch (error) {
    return 'Unable to clear users table in shopfronttest database'
  }
}

const addNewUser = async (username, firstname, lastname, email, password) => {
  try {
    await pool.query('INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)', [username, firstname, lastname, email, password])
    return 'Successfully added new user to users table';
  } catch (error) {
    return 'Unable to add user to users table'
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

module.exports = { clearTestUserTable, addNewUser, checkEmailExists }