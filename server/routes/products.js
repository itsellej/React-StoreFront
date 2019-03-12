const db = require('../database/products');
const express = require('express');
const router = express.Router();


router.get('/', db.getProducts);
router.put('/:id', db.updateProduct);

module.exports = router;