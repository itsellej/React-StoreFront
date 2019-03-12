const pool = require('./pool').pool

const clearTestUserTable = (err, request, response) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  pool.query('DELETE FROM users', (error, results) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Users table in shopfronttest database deleted`)
  })
}

module.exports = { clearTestUserTable }