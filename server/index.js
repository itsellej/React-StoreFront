const express = require('express');
const db = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products', require('./routes/products'))

// app.get('/api/products', db.getProducts)
// app.put('/api/products/:id', db.updateProduct)

module.exports = app;