const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./database')

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

//initialise express and register middleware
const app = express();

//incoming requests with JSON payloads 
app.use(express.json());
//parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//register api middleware

app.use('/api/products', require('./api/products'))

//make express responsive to requests

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})

//get current date and time from database to ensure it works
db.query('SELECT NOW()', (err, res) => {
    if (err.error) {
        return console.log(err.error);
    }
    console.log(`PostgreSQL connected: ${res[0].now}.`)
})

module.exports = app;