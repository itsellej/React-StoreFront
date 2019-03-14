const { Pool } = require('pg');
const { config } = require('../config/config')
const pool = new Pool(config.database);

const clearTestUserTable = () => {
  pool.query('DELETE FROM users', (error, results) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Users table in shopfronttest database deleted`)
  })
}

module.exports = { clearTestUserTable }