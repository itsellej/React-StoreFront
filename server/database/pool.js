const { Pool } = require('pg');
require('dotenv').config()
let databaseName;

if (process.env.NODE_ENV == 'test') {
  databaseName = process.env.TEST_DATABASE_NAME;
} else {
  databaseName = process.env.DATABASE_NAME;
}

const pool = new Pool({
  database: databaseName,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
})

module.exports = { pool }