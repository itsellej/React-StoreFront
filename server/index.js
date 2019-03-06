const path = require('path')
const express = require('express');
const db = require('./database');
const expressLayouts = require('express-ejs-layouts')

const app = express();

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', require('./routes/products'))
app.use('/users', require('./routes/users'))

module.exports = app;