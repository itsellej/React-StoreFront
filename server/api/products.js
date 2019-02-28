const express = require('express');
const Products = require('../models/products');

//create express router
const router = express.Router();

router.get('/', function (req, res) {
    Products.retrieveAll(function (err, products) {
        if (err) {
            return res.json(err);
        }
        return res.json(products);
    })
})

module.exports = router;