const db = require('../database');
const express = require('express');
const router = express.Router();


router.get('/login', (request, response) => {
	response.render('login')
});

router.get('/signup', (request, response) => {
	response.render('signup')
});

router.post('/signup', db.addNewUser);

module.exports = router;